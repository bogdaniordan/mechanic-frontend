import React from 'react';
import Box from "@material-ui/core/Box";
import {CardActionArea, CardContent} from "@material-ui/core";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";

const AppointmentCardComponent = (props) => {
    return (
        <div style={{outline: "1px solid black", padding: "10px"}}>
            <Box component="fieldset" mb={3} borderColor="transparent">
                <CardActionArea>
                    {/*<CardMedia*/}
                    {/*    component="img"*/}
                    {/*    height="140"*/}
                    {/*    width="150"*/}
                    {/*    image={props.data.car.picture}*/}
                    {/*/>*/}
                    <CardContent>
                        <Typography variant="body2" component="p">
                            Required service: {props.data.requiredservice}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                            Date: {props.data.localDate}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                            Time: {props.data.time}
                        </Typography>
                    </CardContent>

                </CardActionArea>
            </Box>
        </div>
    );
};

export default AppointmentCardComponent;