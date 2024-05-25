import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const BookCard = ({ book }) => {
    return (
        <Card sx={{ maxWidth: 345, marginBottom: 4 }}>
            <CardMedia
                component="img"
                alt="green iguana"
                height="140"
                image={book.coverImage}
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {book.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {book.description}
                </Typography>
                <Typography variant="body4" sx={{ mb: 1.5 }} color="text.secondary">
                    Author: {book.author}
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small">View Book</Button>
            </CardActions>
        </Card>
    );
}

export default BookCard