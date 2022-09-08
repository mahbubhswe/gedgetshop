import {
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import axios from "axios";
import Image from "next/image";
import React, { useState } from "react";
import Admin from "..";
import DeleteIcon from "@mui/icons-material/Delete";
import useSWR from "swr";
import FadeLoader from "react-spinners/FadeLoader";
const getCustomerList = (url) => axios.get(url).then((res) => res.data);
export default function ManageCustomers({ customers }) {
  const { data, err } = useSWR("/api/admin/users", getCustomerList);

  if (!data) {
    return (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "grid",
          placeContent: "center",
        }}
      >
        <FadeLoader></FadeLoader>
      </div>
    );
  }

  return (
    <Admin pageTitle={"Manage customer"}>
      <TableContainer>
        <Table>
          <TableHead sx={{ background: "#0A1929" }}>
            <TableRow>
              <TableCell sx={{ color: "white" }}>Img</TableCell>
              <TableCell sx={{ color: "white" }}>Name</TableCell>
              <TableCell sx={{ color: "white" }}>E-mail</TableCell>
              <TableCell sx={{ color: "white" }}>Role</TableCell>
              <TableCell sx={{ color: "white" }}>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {customers
              ? customers.map((customer) => (
                  <TableRow key={customer._id}>
                    <TableCell>
                      <Image
                        src={customer.img}
                        height={50}
                        width={50}
                        quality={100}
                        alt={"Photo"}
                      />
                    </TableCell>

                    <TableCell>{customer.name}</TableCell>
                    <TableCell>{customer.email}</TableCell>
                    <TableCell>
                      {customer.isAdmin ? "Admin" : "Customer"}
                    </TableCell>
                    <TableCell>
                      <IconButton
                        disabled={customer.isAdmin ? true : false}
                        onClick={() => deleteAccount(customer._id)}
                      >
                        <DeleteIcon></DeleteIcon>
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))
              : null}
          </TableBody>
        </Table>
      </TableContainer>
    </Admin>
  );
}

//delete user
const deleteAccount = async (id) => {
  if (confirm("Want to delete this account?") === true) {
    const { data } = await axios.delete(
      `/api/admin/users/deleteAccount?_id=${id}`
    );
    alert(data);
    window.location.reload();
  }
};
// export async function getServerSideProps() {
//   const { data } = await axios.get(`${process.env.url}/api/admin/users`);
//   return { props: { customers: data } };
// }
