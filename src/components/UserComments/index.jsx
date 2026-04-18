import React, { useEffect, useState } from "react";
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Stack,
  Typography,
} from "@mui/material";
import { Link as RouterLink, useParams } from "react-router-dom";

import fetchModel from "../../lib/fetchModelData";
import {
  PHOTO_SRC_BY_FILE,
  formatFriendlyDateTime,
} from "../UserPhotos/photoData";

function UserComments() {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [userData, commentsData] = await Promise.all([
          fetchModel(`/user/${userId}`),
          fetchModel(`/commentsOfUser/${userId}`),
        ]);
        setUser(userData);
        setComments(commentsData);
      } catch (error) {
        console.error("Error fetching comments:", error);
        setUser(null);
        setComments([]);
      } finally {
        setLoading(false);
      }
    };

    loadData();
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

  const fullName = `${user.first_name} ${user.last_name}`;

  return (
    <Stack spacing={2}>
      <Typography variant="h5" component="h1">
        Comments by {fullName}
      </Typography>
      {comments.length === 0 ? (
        <Typography variant="body2" color="text.secondary">
          No comments yet.
        </Typography>
      ) : (
        comments.map((comment) => {
          const photoSrc = PHOTO_SRC_BY_FILE[comment.file_name];
          const destination = `/photos/${comment.photo_user_id}/${comment.photo_id}`;

          return (
            <Card key={comment._id} variant="outlined">
              <CardActionArea
                component={RouterLink}
                to={destination}
                sx={{ display: "flex", alignItems: "stretch" }}
              >
                <CardMedia
                  component="img"
                  image={photoSrc}
                  alt={comment.file_name}
                  sx={{ width: 120, objectFit: "cover", bgcolor: "action.hover" }}
                />
                <CardContent sx={{ flex: 1 }}>
                  <Typography variant="caption" color="text.secondary" display="block">
                    {formatFriendlyDateTime(comment.date_time)}
                  </Typography>
                  <Typography variant="body2" sx={{ mt: 1 }}>
                    {comment.comment}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          );
        })
      )}
    </Stack>
  );
}

export default UserComments;
