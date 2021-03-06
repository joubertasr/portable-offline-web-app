import React, { useEffect, useState } from "react";
import { Button, Grid, makeStyles, Paper, Typography } from "@material-ui/core";
import UploadIcon from "@material-ui/icons/CloudUploadRounded";

import { ImageRoll } from "../Components/ImageRoll";

import { IImageItem } from "../Types/ImageStore";
import {
  addImage,
  getImages,
  removeImage,
  updateTitle,
} from "../Utils/ImageHelper";
import { addTag, getTags, getTagsByIndex, removeTag } from "../Utils/TagHelper";
import { ITagItem } from "../Types/TagStore";
import { IndexKey } from "../Stores/TagStore";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    color: theme.palette.text.secondary,
    display: "flex",
    flexDirection: "column",
  },
  upload: {
    display: "none",
  },
}));

export const Upload = () => {
  const classes = useStyles();
  const [images, setImages] = useState<Array<IImageItem>>([]);
  const [tags, setTags] = useState<Array<ITagItem>>([]);
  const [tagFilter, setTagFilter] = useState<string>("");

  const uploadRef = React.createRef<HTMLInputElement>();

  const onChange = (event: React.FormEvent<HTMLInputElement>) => {
    const target = event.target as HTMLInputElement;
    var files = target.files;
    var reader = new FileReader();
    reader.onloadend = async (event: Event) => {
      if (reader.result && typeof reader.result === "string") {
        if (reader.result) {
          addImage(reader.result.toString());
        }
        setImages(await getImages());
      }
    };

    files && reader.readAsDataURL(files[0]);
  };

  const upload = () => {
    uploadRef && uploadRef.current && uploadRef.current.click();
  };

  useEffect(() => {
    async function initialiseStore() {
      setImages(await getImages());
      setTags(await getTags());
    }
    initialiseStore();
  }, []);

  return (
    <Grid container={true} spacing={2}>
      <Grid item={true} xs={12}>
        <Paper className={classes.paper}>
          <Typography variant="h1">Upload</Typography>
          <Typography variant="body1">
            On this page you can upload a picture.
          </Typography>
          <Button onClick={upload}>
            <UploadIcon />
          </Button>
          <input
            className={classes.upload}
            type="file"
            onChange={onChange}
            accept="image/*"
            ref={uploadRef}
          />
        </Paper>
      </Grid>
      {images.length > 0 && (
        <Grid item={true} xs={12}>
          <ImageRoll
            tags={tags}
            images={images}
            tagFilter={tagFilter}
            setTagFilter={(filter: string) => setTagFilter(filter)}
            removeImage={async (key) => {
              removeImage(key);
              setImages(await getImages());
            }}
            removeTag={async (key) => {
              await removeTag(key);
              setTags(await getTags());
            }}
            addTag={async (imageKey, value) => {
              await addTag(imageKey, value);
              const updatedTags = await getTagsByIndex<IndexKey, ITagItem>(
                "imageKey",
                imageKey
              );
              const otherTags = tags.filter(
                (t) => t.data.imageKey !== imageKey
              );
              setTags([...otherTags, ...updatedTags]);
            }}
            updateTitle={async (key, title) => {
              updateTitle(key, title);
              setImages(await getImages());
            }}
          />
        </Grid>
      )}
    </Grid>
  );
};
export default Upload;
