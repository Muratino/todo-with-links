import { Box, CardContent } from "@mui/material";
import React from "react";
import IconButton from "@mui/material/IconButton";
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";
import { LinkParent } from "../linkParent/LinkParent";
import { useSelector, useDispatch } from "react-redux";
import { createParent } from "../../redux/Slice/links";

export const LinkBlock = () => {
  const { links, typeParent, filterLinks, isFilteringLinks } = useSelector(
    (state) => state.links
  );
  const dispatch = useDispatch();

  const createNewParent = () => {
    const parent = {
      parentSummary: typeParent.parentSummary
        ? typeParent.parentSummary
        : "Parent title",
      parentId: Math.floor(Math.random() * (1000 - 10)) + 10,
      childrens: [],
    };

    dispatch(createParent(parent));
  };

  return (
    <CardContent>
      <Box
        sx={{
          backgroundColor: "#f6f6f6",
          padding: "10px 20px 40px 10px",
          width: "98%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          position: "relative",
        }}
      >
        {isFilteringLinks
          ? filterLinks.map((el) => <LinkParent key={el.parentId} {...el} />)
          : links.map((el) => <LinkParent key={el.parentId} {...el} />)}
        <IconButton
          onClick={createNewParent}
          sx={{
            padding: 0,
            width: "20px",
            position: "absolute",
            bottom: "6px",
            right: "20px",
          }}
        >
          <AddCircleRoundedIcon fontSize="large" />
        </IconButton>
      </Box>
    </CardContent>
  );
};
