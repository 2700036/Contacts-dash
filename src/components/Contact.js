import React from 'react';
import { Card, makeStyles, CardContent, Typography, Grid, CardActions, Button, IconButton } from '@material-ui/core';
import { Link as A } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';


const useStyles = makeStyles((theme) => ({  
  card: {
    height: '100%', 
    justifyContent: 'space-between',
    display: 'flex',
    flexDirection: 'column',
    position: 'relative' 
  },
  deleteButton: {
    marginRight: 'auto'
   
  },
}));

export default function Contact({ contact }) {
  const classes = useStyles();
  return (
    <Grid item xs={12} sm={6} md={4}>
      <Card  className={classes.card}>
        <CardContent className={classes.cardContent}>
          <Typography variant='h5'>{contact.name}</Typography>
          <Typography variant='caption' paragraph>
            из {contact.company.name}
          </Typography>
          <Typography variant='body1'>
            e-mail: <A href={`mailto:${contact.email}`}>{contact.email}</A>
          </Typography>
          <Typography variant='body1' paragraph>
            тел. <A href={`tel:${contact.website}`}>{contact.phone}</A>
          </Typography>
          <Typography paragraph >
            <A target='_blank' href={`https://${contact.website}`}>
              www.{contact.website}
            </A>
          </Typography>
        </CardContent>
          <CardActions >
            <IconButton className={classes.deleteButton}>
            <DeleteIcon color='secondary'/>
            </IconButton>
            <Button size='small' color='primary' className={classes.detailsButton}>
              Подробней
            </Button >
          </CardActions>
      </Card>
    </Grid>
  );
}
