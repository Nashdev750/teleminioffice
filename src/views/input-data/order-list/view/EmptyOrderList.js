// material-ui
import { useTheme } from '@mui/material/styles';
import { CardMedia, Grid, Typography, useMediaQuery } from '@mui/material';

// project imports
import { gridSpacing } from 'store/constant';

// assets
import imageEmpty from 'assets/images/e-commerce/empty.svg';
import imageDarkEmpty from 'assets/images/e-commerce/empty-dark.svg';

// ==============================|| CHECKOUT CART - NO/EMPTY CART ITEMS ||============================== //

const EmptyOrderList = ({ Month }) => {
    const theme = useTheme();
    const matchDownMD = useMediaQuery(theme.breakpoints.down('lg'));

    return (
        <Grid container justifyContent="center" spacing={gridSpacing} sx={{ my: 3 }}>
            <Grid item xs={12} sm={8} md={6}>
                <CardMedia component="img" image={theme.palette.mode === 'dark' ? imageDarkEmpty : imageEmpty} title="Slider5 image" />
            </Grid>
            <Grid item xs={12} sm={8}>
                <Grid container direction="column" alignItems="center" spacing={1}>
                    <Grid item>
                        <Typography variant={matchDownMD ? 'h3' : 'h2'} color="inherit">
                            Order List for the Months of {Month} is empty
                        </Typography>
                    </Grid> 
                </Grid>
            </Grid>
        </Grid>
    );
};

export default EmptyOrderList;
