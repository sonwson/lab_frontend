import React, { useEffect, useState } from "react";
import {
  Box,
  Divider,
  List,
  ListItemButton,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

import "./styles.css";
import fetchModel from "../../lib/fetchModelData";

/**
 * Define UserList, a React component of Project 4.
 */
function UserList() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchModel("/user/list")
      .then((data) => setUsers(data))
      .catch((error) => console.error("Error fetching users:", error));
  }, []);

  return (
    <div className="user-list">
      <Typography variant="subtitle2" color="text.secondary" sx={{ px: 2, pt: 1, pb: 0.5 }}>
        Users
      </Typography>
      <List component="nav" dense disablePadding>
        {users.map((user) => (
          <React.Fragment key={user._id}>
            <ListItemButton
              component={RouterLink}
              to={`/users/${user._id}`}
            >
              <ListItemText
                primary={`${user.first_name} ${user.last_name}`}
                primaryTypographyProps={{ variant: "body2" }}
              />
              <Stack direction="row" spacing={1}>
                <Box className="user-list-bubble user-list-bubble-photo">
                  {user.photoCount ?? 0}
                </Box>
                <Box
                  component={RouterLink}
                  to={`/comments/${user._id}`}
                  className="user-list-bubble user-list-bubble-comment"
                  onClick={(event) => event.stopPropagation()}
                  sx={{ textDecoration: "none" }}
                >
                  {user.commentCount ?? 0}
                </Box>
              </Stack>
            </ListItemButton>
            <Divider component="li" />
          </React.Fragment>
        ))}
      </List>
    </div>
  );
}

export default UserList;
