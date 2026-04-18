import React, { useEffect, useState } from "react";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Divider,
  Link,
  Stack,
  Typography,
} from "@mui/material";
import { Link as RouterLink, useParams } from "react-router-dom";

import "./styles.css";
import fetchModel from "../../lib/fetchModelData";
import {
  PHOTO_SRC_BY_FILE,
  formatFriendlyDateTime,
  parseModelDate,
} from "./photoData";

/**
 * Define UserPhotos, a React component of Project 4.
 */
function UserPhotos() {
  const { userId, photoId } = useParams();
  const [user, setUser] = useState(null);
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [userData, photosData] = await Promise.all([
          fetchModel(`/user/${userId}`),
          fetchModel(`/photosOfUser/${userId}`)
        ]);
        setUser(userData);
        setPhotos(photosData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };
    fetchData();
  }, [userId]);

  if (loading) {
    return <Typography variant="body1">Loading...</Typography>;
  }

  if (!user) {
    return (
      <Typography variant="body1" color="text.secondary">
        User not found.
      </Typography>
    );
  }

  const visiblePhotos = photoId
    ? photos.filter((photo) => photo._id === photoId)
    : photos;
  const ownerName = `${user.first_name} ${user.last_name}`;

  return (
    <Stack spacing={3} className="user-photos">
      <Typography variant="h5" component="h1">
        {photoId ? `Photo by ${ownerName}` : `Photos of ${ownerName}`}
      </Typography>
      {visiblePhotos.length === 0 ? (
        <Typography variant="body2" color="text.secondary">
          {photoId ? "Photo not found." : "No photos yet."}
        </Typography>
      ) : (
        visiblePhotos.map((photo) => {
          const src = PHOTO_SRC_BY_FILE[photo.file_name];
          const comments = [...(photo.comments || [])].sort((a, b) => {
            const da = parseModelDate(a.date_time);
            const db = parseModelDate(b.date_time);
            if (!da || !db) return 0;
            return da - db;
          });

          return (
            <Card key={photo._id} variant="outlined">
              <CardMedia
                component="img"
                image={src}
                alt={photo.file_name}
                sx={{ maxHeight: 480, objectFit: "contain", bgcolor: "action.hover" }}
              />
              <CardContent>
                <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                  {formatFriendlyDateTime(photo.date_time)}
                </Typography>
                <Divider sx={{ my: 2 }} />
                <Typography variant="subtitle1" gutterBottom>
                  Comments
                </Typography>
                {comments.length === 0 ? (
                  <Typography variant="body2" color="text.secondary">
                    No comments.
                  </Typography>
                ) : (
                  <Stack spacing={2} divider={<Divider flexItem />}>
                    {comments.map((c) => {
                      const commenter = c.user;
                      const commenterName = commenter
                        ? `${commenter.first_name} ${commenter.last_name}`
                        : "Unknown user";
                      const commenterId = commenter?._id;

                      return (
                        <Box key={c._id}>
                          <Typography variant="caption" color="text.secondary" display="block">
                            {formatFriendlyDateTime(c.date_time)}
                          </Typography>
                          {commenterId ? (
                            <Link
                              component={RouterLink}
                              to={`/users/${commenterId}`}
                              variant="subtitle2"
                              underline="hover"
                            >
                              {commenterName}
                            </Link>
                          ) : (
                            <Typography variant="subtitle2">{commenterName}</Typography>
                          )}
                          <Typography variant="body2" sx={{ mt: 0.5 }}>
                            {c.comment}
                          </Typography>
                        </Box>
                      );
                    })}
                  </Stack>
                )}
              </CardContent>
            </Card>
          );
        })
      )}
    </Stack>
  );
}

export default UserPhotos;
