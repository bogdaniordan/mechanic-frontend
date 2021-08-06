import React from 'react';
import Box from "@material-ui/core/Box";
import {CardActionArea, CardContent} from "@material-ui/core";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";

const AppointmentCardComponent = (props) => {
    return (
        <div style={{outline: "1px solid black"}}>
            <Box component="fieldset" mb={3} borderColor="transparent">
                <CardActionArea>
                    <CardMedia
                        component="img"
                        height="140"
                        image={props.data.car.picture}
                    />
                    <CardContent>
                        <Typography variant="body2" component="p">
                            Required service: {props.data.requiredservice}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                            Date: {props.data.localDate}
                        </Typography>
                    </CardContent>


                </CardActionArea>
            </Box>
        </div>
    );
};

export default AppointmentCardComponent;