import axios from "axios";
import { useFormik } from "formik";
import * as yup from "yup";
import { Button, TextField } from "@mui/material";
import { CartArrayType } from "./CartItems";
import { Dispatch } from "react";
import CART_STATUS from "../constants/cartStatus";

const validationSchema = yup.object({
  name: yup.string().required("Name is required"),
});

interface CartFormInterface {
  orderData: CartArrayType;
  setCartData: Dispatch<any>;
  setCartStatus: Dispatch<any>;
}

export default function CartForm({
  orderData,
  setCartData,
  setCartStatus,
}: CartFormInterface) {
  const transformCartData = () => {
    const transformed = orderData.map((orderItem) => {
      // TODO fix type errors here
      // @ts-ignore
      orderItem.menuItemID = orderItem.id;
      // @ts-ignore
      delete orderItem.name;
      // @ts-ignore
      delete orderItem.description;
      // @ts-ignore
      delete orderItem.id;
      return orderItem;
    });
    return transformed;
  };
  const formik = useFormik({
    initialValues: {
      name: "",
    },
    validationSchema,
    onSubmit: async (values, onSubmitProps) => {
      const body = {
        orderItems: transformCartData(),
        customerName: values.name,
      };
      await axios.post("/proxy/8333/orders", body);
      onSubmitProps.resetForm();
      setCartData({ type: "CLEAR", data: null });
      setCartStatus(CART_STATUS.ORDER_PLACED);
    },
  });
  return (
    <form onSubmit={formik.handleSubmit}>
      <TextField
        margin="normal"
        id="name"
        name="name"
        label="First Name"
        type="text"
        fullWidth
        variant="outlined"
        onChange={formik.handleChange}
        error={formik.touched.name && Boolean(formik.errors.name)}
        helperText={formik.touched.name && formik.errors.name}
        value={formik.values.name}
      />
      <Button fullWidth type="submit" variant="contained">
        Submit your order
      </Button>
    </form>
  );
}
