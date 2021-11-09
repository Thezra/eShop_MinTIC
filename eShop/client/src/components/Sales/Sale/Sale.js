import React from 'react';
import { Card, CardActions, CardContent, CardMedia, Button, Typography } from '@material-ui/core/';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import DeleteIcon from '@material-ui/icons/Delete';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import ThumbUpAltOutlined from '@material-ui/icons/ThumbUpAltOutlined';
import { useDispatch } from 'react-redux';
import moment from 'moment';

import { likeSale, deleteSale } from '../../../actions/sales';
import useStyles from './styles';

const Sale = ({ sale, setCurrentId }) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const user = JSON.parse(localStorage.getItem('profile'));

  return (
    <Card className={classes.card}>
      <CardMedia className={classes.media} image={sale.selectedFile || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} title={sale.title} />
      <div className={classes.overlay}>
        <Typography variant="h6">{sale.name}</Typography>
        <Typography variant="body2">{moment(sale.createdAt).fromNow()}</Typography>
      </div>
      {(user?.result?.googleId === sale?.creator || user?.result?._id === sale?.creator) && (
      <div className={classes.overlay2}>
        <Button onClick={() => setCurrentId(sale._id)} style={{ color: 'white' }} size="small">
          <MoreHorizIcon fontSize="default" />
        </Button>
      </div>
      )}
      <div className={classes.details}>
        <Typography variant="body2" color="textSecondary" component="h2">{sale.tags.map((tag) => `#${tag} `)}</Typography>
      </div>
      <Typography className={classes.title} gutterBottom variant="h5" component="h2">{sale.title}</Typography>
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">{sale.message}</Typography>
      </CardContent>
      <CardActions className={classes.cardActions}>
        {(user?.result?.googleId === sale?.creator || user?.result?._id === sale?.creator) && (
        <Button size="small" color="secondary" onClick={() => dispatch(deleteSale(sale._id))}>
          <DeleteIcon fontSize="small" /> Delete
        </Button>
        )}
      </CardActions>
    </Card>
  );
};

export default Sale;