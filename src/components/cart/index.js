import { useTheme } from "@mui/material/styles";
import Drawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Toolbar from "@mui/material/Toolbar";
import Tooltip from "@mui/material/Tooltip";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import useMediaQuery from "@mui/material/useMediaQuery";

import FavoriteIcon from "@mui/icons-material/Favorite";
import DeleteIcon from "@mui/icons-material/Delete";

import { Colors } from "../../styles/theme";
import { useUIContext } from "../../context/ui";

const Cart = () => {
  const { cart, setCart, showCart, setShowCart, wishlist, setWishlist } =
    useUIContext();

  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("md"));

  const removeItem = (id) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  const moveToWishlist = (product) => {
    setWishlist([...wishlist, product]);
    removeItem(product.id);
  };

  const cartEmptyContent = (
    <Typography variant={matches ? "h5" : "h3"} color={Colors.black}>
      Your cart is empty
    </Typography>
  );

  const cartFilledContent = cart.map((item) => (
    <>
      <ListItem
        key={item.id}
        alignItems="flex-start"
        position="relative"
        sx={{ padding: "15px 0 30px 0" }}
      >
        <ListItemAvatar>
          <Avatar
            alt={item.title}
            src={item.images[0]}
            sx={{ width: 90, height: 90, mr: 2 }}
          />
        </ListItemAvatar>
        <ListItemText
          primary={
            <Typography variant="h4" fontSize="20px">
              {item.title}
            </Typography>
          }
          secondary={
            <>
              <Typography variant="body1">{item.description}</Typography>
              <Typography variant="h6">{`$${item.price}`}</Typography>
            </>
          }
        />
        <Stack direction="row">
          <Toolbar
            variant="dense"
            sx={{
              "&.MuiToolbar-root": {
                padding: 0,
              },
              position: "absolute",
              bottom: 0,
              right: 0,
            }}
          >
            <Tooltip title="Move to wishlist">
              <IconButton onClick={() => moveToWishlist(item)}>
                <FavoriteIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Remove from cart">
              <IconButton onClick={() => removeItem(item.id)}>
                <DeleteIcon />
              </IconButton>
            </Tooltip>
          </Toolbar>
        </Stack>
      </ListItem>
      <Divider variant="inset" component="li" />
    </>
  ));

  return (
    <Drawer
      open={showCart}
      onClose={() => setShowCart(false)}
      anchor="right"
      PaperProps={{
        sx: {
          width: matches ? "100%" : 500,
          background: Colors.light_gray,
          borderRadius: 0,
        },
      }}
    >
      <Box
        sx={{ p: 4 }}
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
      >
        {cart.length ? (
          <>
            <Typography variant="h3" color={Colors.black}>
              Your cart
            </Typography>
            <Button sx={{ mt: 4 }} onClick={() => setCart([])}>
              Clear cart
            </Button>
            <Paper elevation={0} sx={{ mt: 2, width: "95%", p: 4 }}>
              <List>{cartFilledContent}</List>
            </Paper>

            <Button sx={{ mt: 4 }} variant="contained">
              Proceed to payment
            </Button>
          </>
        ) : (
          cartEmptyContent
        )}
      </Box>
      <Button onClick={() => setShowCart(false)}>Close</Button>
    </Drawer>
  );
};

export default Cart;
