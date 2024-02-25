"use client";

import { useState, useEffect } from "react";
import styles from "./dataManagementPanel.module.scss";
import axios from "axios";
import { useMutation, useQuery } from "@tanstack/react-query";
import { EMPTY_USER } from "@/shared/constants/user";
import InputForm from "@/components/form/InputForm";
import RenderList from "@/components/admin_panel/data-management-panel/search-panel/SearchList";
import AddNewElement from "@/components/admin_panel/data-management-panel/search-panel/AddNewElement";
import SearchFilter from "@/components/admin_panel/data-management-panel/search-panel/SearchFilter";
import ResponseMessage from "@/components/form/ResponseMessage";

const UsersPage = () => {
  const [usersList, setUsersList] = useState([]);
  const [filterValue, setFilterValue] = useState("");
  const [selectedUser, setSelectedUser] = useState(EMPTY_USER);

  const { data: users, isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const { data } = await axios.get("/api/user");
      return data;
    },
    onSuccess: (users) => {
      setUsersList(users);
    },
    refetchOnWindowFocus: false,
  });

  const actionType = selectedUser.id ? "update" : "create";
  const {
    mutate: sendUserData,
    error,
    data: response,
  } = useMutation({
    mutationFn: async (userData) => {
      if (actionType === "create") {
        const { data } = await axios.post("/api/user", userData);
        return data;
      } else if (actionType === "update") {
        const { data } = await axios.patch(`/api/user`, userData);
        return data;
      }
    },
  });

  const onChangeFilter = (e) => {
    setFilterValue(e.target.value);
  };
  const onChangeUserData = (e) => {
    setSelectedUser((prevData) => {
      return {
        ...prevData,
        [e.target.name]: e.target.value,
      };
    });
  };
  const onSelectUser = (user) => {
    setSelectedUser({ ...user, password: "" });
  };

  const submitUser = () => {
    sendUserData(selectedUser);
  };

  useEffect(() => {
    if (filterValue) {
      setUsersList(
        users.filter(
          (user) =>
            user.firstname.toLowerCase().includes(filterValue.toLowerCase()) ||
            user.surname.toLowerCase().includes(filterValue.toLowerCase()) ||
            user.email.toLowerCase().includes(filterValue.toLowerCase())
        )
      );
    } else {
      setUsersList(users);
    }
  }, [users, filterValue]);

  return (
    <>
      <div className={styles.container}>
        <div className={styles.searchPanel}>
          <SearchFilter
            filterValue={filterValue}
            onChangeFilter={onChangeFilter}
          />
          <AddNewElement
            onAddNewElement={onSelectUser}
            currentSelectedId={selectedUser.id}
          >
            Dodaj nowego użytkownika
          </AddNewElement>
          <RenderList
            dataToRender={["email", "firstname", "surname"]}
            isLoading={isLoading}
            listToRender={usersList}
            currentSelectedId={selectedUser.id}
            onSelectElement={onSelectUser}
          />
        </div>
        <div className={styles.dataManagementPanel}>
          <div className={styles.title}>
            <div>Dodawanie użytkownika</div>
          </div>

          <div className={styles.dataWrapper}>
            <div className={styles.data}>
              <InputForm
                key="email"
                label={"Email"}
                name={"email"}
                onChange={(e) => onChangeUserData(e)}
                value={selectedUser.email}
              />
              <InputForm
                key="firstname"
                label={"Imię"}
                name={"firstname"}
                onChange={(e) => onChangeUserData(e)}
                value={selectedUser.firstname}
              />
              <InputForm
                key="surname"
                label={"Imię"}
                name={"surname"}
                onChange={(e) => onChangeUserData(e)}
                value={selectedUser.surname}
              />

              <InputForm
                key="password"
                label={"Hasło"}
                name={"password"}
                type={"password"}
                onChange={(e) => onChangeUserData(e)}
                value={selectedUser.password}
              />
            </div>
            <div className={styles.data}>
              <InputForm
                key="role"
                label={"Rola"}
                name={"role"}
                onChange={(e) => onChangeUserData(e)}
                value={selectedUser.role}
              />
              <InputForm
                key="phoneNumber"
                label={"Telefon"}
                name={"phoneNumber"}
                onChange={(e) => onChangeUserData(e)}
                value={selectedUser.phoneNumber}
              />
              <InputForm
                key="note"
                label={"Notatka"}
                name={"note"}
                onChange={(e) => onChangeUserData(e)}
                value={selectedUser.note}
              />
            </div>
          </div>

          <div className={styles.submit}>
            {selectedUser.id ? (
              <button onClick={submitUser}>
                {" "}
                Edytuj użytkownika <img src="/images/edit.svg" />{" "}
              </button>
            ) : (
              <button onClick={submitUser}>
                {" "}
                Dodaj użytkownika <img src="/images/login.svg" />{" "}
              </button>
            )}
          </div>

          <ResponseMessage response={response} error={error} />
        </div>
      </div>
    </>
  );
};

export default UsersPage;
