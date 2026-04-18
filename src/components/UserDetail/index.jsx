import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Divider,
  Stack,
  Typography,
} from "@mui/material";
import { Link as RouterLink, useParams } from "react-router-dom";

import "./styles.css";
import fetchModel from "../../lib/fetchModelData";

/**
 * Define UserDetail, a React component of Project 4.
 */
function UserDetail() {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchModel(`/user/${userId}`)
      .then((data) => {
        setUser(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching user:", error);
        setLoading(false);
      });
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
    <Stack spacing={2} className="user-detail">
      <Box>
        <Typography variant="h5" component="h1" gutterBottom>
          {fullName}
        </Typography>
        <Divider sx={{ my: 1 }} />
        <Stack spacing={1}>
          <Typography variant="body2">
            <strong>Location:</strong> {user.location}
          </Typography>
          <Typography variant="body2">
            <strong>Occupation:</strong> {user.occupation}
          </Typography>
          <Box>
            <Typography variant="body2" component="span" fontWeight="bold">
              Description:
            </Typography>
            <Typography variant="body2" component="div" sx={{ mt: 0.5 }}>
              {user.description}
            </Typography>
          </Box>
        </Stack>
      </Box>
      <Button
        variant="contained"
        component={RouterLink}
        to={`/photos/${user._id}`}
        sx={{ alignSelf: "flex-start" }}
      >
        View photos
      </Button>
    </Stack>
  );
}

export default UserDetail;
