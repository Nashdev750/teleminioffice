// material-ui
import { useTheme } from '@mui/material/styles';
import React, { forwardRef, useState } from 'react';
import Avatar from 'ui-component/extended/Avatar';
import {
    CardContent,
    Grid,
    Fab,
    Typography,
    Button,
    Tooltip,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
    Slide,
    Dialog,
    Divider
} from '@mui/material';
import AddIcon from '@mui/icons-material/AddTwoTone';
import SubCard from 'ui-component/cards/SubCard';
import AnimateButton from 'ui-component/extended/AnimateButton';
// project imports
import { gridSpacing } from 'store/constant';

const Transition = forwardRef((props, ref) => <Slide direction="left" ref={ref} {...props} />);

const ItemCard = ({ itemImage, name, packages, HandleSaveChanges }) => {
    const theme = useTheme();
    const [inputFields, setInputFields] = useState({});
    const [open, setOpen] = React.useState(false);
    const handleCloseDialog = () => {
        setOpen(false);
    };

    const handleChange = (event) => { 
        inputFields[event.target.name] = event.target.value;
        setInputFields(inputFields); 
    }

    const handleSave = () => {
        HandleSaveChanges(name, inputFields)
        setOpen(false);
    }

    return (
        <>
            <SubCard
                title={
                    <Grid container spacing={1} alignItems="left">
                        <Grid item md={4}>
                            <Grid container alignItems="center" spacing={0}>
                                <Grid item xs={12} sm={6}>
                                    <Grid
                                        container
                                        alignItems="center"
                                        spacing={1}
                                        justifyContent='center'
                                    >
                                        <Grid item>
                                            <Avatar alt="User 1" size="lg" src={itemImage} />
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid container alignItems="center" spacing={0}>
                                <Grid item xs={12} sm={6}>
                                    <Grid
                                        container
                                        alignItems="center"
                                        spacing={1}
                                        justifyContent='center'
                                    >
                                        <Grid item sm zeroMinWidth>
                                            <Typography variant="h4" align="center">
                                                {name}
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>

                        <Grid item md={8}>  
                        </Grid>
                    </Grid>
                }
            >
                <CardContent alignItems="center" sx={{ textAlign: 'center', justifyContent: 'center', alignContent: 'center' }}>
                    <Tooltip title={`Add ${name} Items`} onClick={() => setOpen(!open)} >
                        <Fab color="primary" size="large" sx={{ boxShadow: 'none', ml: 1, width: 128, height: 128, minHeight: 128 }}>
                            <AddIcon fontSize="small" onClick={() => setOpen(!open)} />
                        </Fab>
                    </Tooltip>

                </CardContent>
            </SubCard>
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleCloseDialog}
                sx={{
                    '&>div:nth-of-type(3)': {
                        justifyContent: 'flex-end',
                        '&>div': {
                            m: 0,
                            borderRadius: '5px',
                            maxWidth: 450,
                            maxHeight: '100%'
                        }
                    }
                }}
            >
                <DialogTitle>
                    <Grid container spacing={2} alignItems="center">
                        <Grid item>
                            <Avatar alt="User 1" size="md" src={itemImage} />
                        </Grid>
                        <Grid item xs zeroMinWidth>
                            <Typography align="left" variant="h4">
                                Add {name} Items
                            </Typography>
                        </Grid>
                    </Grid>
                </DialogTitle>
                <DialogContent>
                    <Divider />
                    <Grid container spacing={gridSpacing} sx={{ mt: 0.25 }}>
                        {packages?.map(i => (
                            <Grid item md={6} xs={12}>
                                <TextField type="number" id="outlined-basic5" fullWidth
                                    InputProps={{
                                        inputProps: {
                                            max: i.amount, min: 0
                                        }
                                    }}
                                    label={`${i.package_size} KG`} defaultValue="0" value={i.intake}
                                    name={`${i.package_size}KG`} onChange={(e) => handleChange(e)} />
                            </Grid>
                        ))}
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button variant="text" color="error" onClick={handleCloseDialog}>
                        Close
                    </Button>
                    <AnimateButton>
                        <Button variant="contained" onClick={handleSave}>Add</Button>
                    </AnimateButton>
                </DialogActions>
            </Dialog>
        </>
    )
}
export default ItemCard;
