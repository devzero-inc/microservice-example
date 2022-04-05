import axios from "axios";
import { useFormik } from "formik";
import * as yup from "yup";
import { Button, TextField } from "@mui/material";
import { CartArrayType } from "./CartItems";
import { CallTrackerReportInformation } from "assert";

const validationSchema = yup.object({
  name: yup.string().required("Name is required"),
});

interface CartFormInterface {
  orderData: CartArrayType;
}

export default function CartForm({ orderData }: CartFormInterface) {
  const formik = useFormik({
    initialValues: {
      name: "",
    },
    validationSchema,
    onSubmit: async (values, onSubmitProps) => {
      const body = {
        orderItems: orderData,
        name: values.name,
      };
      await axios.post("http://localhost:8333/orders", body);
      onSubmitProps.resetForm();
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
        Submit
      </Button>
    </form>
  );
}
