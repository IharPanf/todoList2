import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import FolderIcon from '@material-ui/icons/Folder';
import DeleteIcon from '@material-ui/icons/Delete';
import Button from '@material-ui/core/Button';
import PlaylistAddIcon from '@material-ui/icons/PlaylistAdd';
import Switch from '@material-ui/core/Switch';
import * as randomString from 'randomstring';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    justifyContent: 'center'
  },
  title: {
    margin: theme.spacing(4, 0, 2),
  },
  actions: {
    display: 'flex',
    justifyContent: 'flex-end'
  },
  button: {
    margin: theme.spacing(1),
  },
}));

const LENGTH_OF_RANDOM_STRING = 12;

const items = [
  { title: 'First title', shortDescription: 'short description 1', key: randomString.generate(LENGTH_OF_RANDOM_STRING)},
  { title: 'Second title', shortDescription: 'short description 2', key: randomString.generate(LENGTH_OF_RANDOM_STRING)},
  { title: 'Third title', shortDescription: 'short description 3', key: randomString.generate(LENGTH_OF_RANDOM_STRING)},
];

export default function InteractiveList() {
  const classes = useStyles();
  const [todoItems, setTodoItems ] = useState(items);

  const handleAddItem = () => {
    const items = [...todoItems];
    const [firstItem] = todoItems;


    items.push({
      ...firstItem,
      key: randomString.generate(LENGTH_OF_RANDOM_STRING)
    });

    setTodoItems(items);
  };

  const handleRemoveItem = (key) => {
    const filteredItems = todoItems.filter(item => item.key !== key);

    setTodoItems(filteredItems);
  };

  return (
      <Grid container className={classes.root} spacing={2}>
        <Grid item xs={12} md={6}>
          <Typography variant="h6" className={classes.title}>
            {'TODO list. React with Redux'}
          </Typography>
          <List component={Paper}>
            {
              todoItems.map((item) => (
                  <ListItem key={item.key}>
                    <ListItemAvatar>
                      <Avatar>
                        <FolderIcon />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                        primary={item.title}
                        secondary={item.shortDescription}
                    />
                    <ListItemSecondaryAction>
                      <Switch
                          checked={true}
                          onChange={() => undefined}
                          name="checkedA"
                          inputProps={{ 'aria-label': 'activate checkbox' }}
                      />
                      <IconButton edge="end" aria-label="delete" onClick={() => handleRemoveItem(item.key)}>
                        <DeleteIcon />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
              ))
            }
          </List>
          <Grid item xs={12} className={classes.actions}>
            <Button
                variant="contained"
                color="default"
                onClick={handleAddItem}
                className={classes.button}
                startIcon={<PlaylistAddIcon />}
            >
              {'Add'}
            </Button>
          </Grid>
        </Grid>
      </Grid>
  );
}
