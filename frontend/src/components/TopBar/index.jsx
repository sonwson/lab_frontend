import React, { useEffect, useState } from "react";
import { AppBar, Toolbar, Typography } from "@mui/material";
import { useMatch } from "react-router-dom";

import "./styles.css";
import fetchModel from "../../lib/fetchModelData";


function TopBar() {
  const userDetailMatch = useMatch("/users/:userId");
  const commentsMatch = useMatch("/comments/:userId");
  const photoDetailMatch = useMatch("/photos/:userId/:photoId");
  const photosMatch = useMatch("/photos/:userId");
  const usersListMatch = useMatch({ path: "/users", end: true });

  const [contextLabel, setContextLabel] = useState(null);

  useEffect(() => {
    const updateLabel = async () => {
      if (userDetailMatch?.params?.userId) {
        try {
          const u = await fetchModel(`/user/${userDetailMatch.params.userId}`);
          setContextLabel(`${u.first_name} ${u.last_name}`);
        } catch {
          setContextLabel("User");
        }
      } else if (commentsMatch?.params?.userId) {
        try {
          const u = await fetchModel(`/user/${commentsMatch.params.userId}`);
          setContextLabel(`Comments by ${u.first_name} ${u.last_name}`);
        } catch {
          setContextLabel("Comments");
        }
      } else if (photoDetailMatch?.params?.userId) {
        try {
          const u = await fetchModel(`/user/${photoDetailMatch.params.userId}`);
          setContextLabel(`Photo by ${u.first_name} ${u.last_name}`);
        } catch {
          setContextLabel("Photo");
        }
      } else if (photosMatch?.params?.userId) {
        try {
          const u = await fetchModel(`/user/${photosMatch.params.userId}`);
          setContextLabel(`Photos of ${u.first_name} ${u.last_name}`);
        } catch {
          setContextLabel("Photos");
        }
      } else if (usersListMatch) {
        setContextLabel("Users");
      } else {
        setContextLabel(null);
      }
    };
    updateLabel();
  }, [commentsMatch, photoDetailMatch, photosMatch, userDetailMatch, usersListMatch]);

  return (
    <AppBar className="topbar-appBar" position="absolute">
      <Toolbar sx={{ justifyContent: "space-between", gap: 2 }}>
        <Typography variant="h5" color="inherit" noWrap>
          TuanSon
        </Typography>
        {contextLabel && (
          <Typography variant="subtitle1" color="inherit" noWrap sx={{ opacity: 0.95 }}>
            {contextLabel}
          </Typography>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default TopBar;
