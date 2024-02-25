"use client";

import { useMutation, useQuery } from "@tanstack/react-query";
import styles from "./content.module.scss";
import { useState } from "react";
import axios from "axios";
import SectionCard from "@/components/admin_panel/content/SectionCard";
import EmptyContent from "@/components/static-statements/EmptyContent";
import Loading from "@/components/static-statements/Loading";
import SubmitButton from "@/components/form/SubmitButton";
import ResponseMessage from "@/components/form/ResponseMessage";

const ContentPage = () => {
  const [changedFields, setChangedFields] = useState([]);

  const { data: content, isLoading } = useQuery({
    queryKey: ["content"],
    queryFn: async () => {
      const { data } = await axios.get("/api/content");
      return data;
    },
    refetchOnWindowFocus: false,
  });

  const {
    mutate: sendContentChanges,
    data: response,
    isLoading: isSendingReq,
    error,
  } = useMutation({
    mutationFn: async (postData) => {
      const { data } = await axios.patch("/api/content", postData);
      return data;
    },
  });

  const changeHandler = (index, section, name, isChanged) => {
    if (isChanged) {
      setChangedFields((prevArray) => {
        prevArray.push({ index, section, name });
        return prevArray;
      });
    } else {
      setChangedFields((prevArray) => {
        const newArray = prevArray.filter((item) => item.index !== index);
        return newArray;
      });
    }
  };

  const saveChanges = (event) => {
    event.preventDefault();

    const updatedContent = [];
    changedFields.map((field) =>
      updatedContent.push({
        ...field,
        text: event.target[field.index].value,
      })
    );

    if (updatedContent.length) {
      sendContentChanges(updatedContent);
      setChangedFields([]);
    }
  };

  if (isLoading) {
    return <Loading />;
  }
  if (content) {
    return (
      <div className={styles.container}>
        <form
          onSubmit={(event) => saveChanges(event)}
          className={styles.section}
        >
          <div className={styles.sectionName}>Home</div>
          {Object.entries(content?.home).map(([key, value], index) => (
            <SectionCard
              changeHandler={(isChanged) =>
                changeHandler(index, "home", key, isChanged)
              }
              key={key}
              name={key}
              text={value}
            />
          ))}
          <SubmitButton isLoading={isSendingReq} />
        </form>

        <ResponseMessage response={response} error={error}>
          {response &&
            (!response.length ? (
              <div> Wszystko zostało dodane poprawnie </div>
            ) : (
              <>
                <div> Nie udało się dodać: </div>
                {response.map((contentName) => (
                  <div key={contentName}> {contentName} </div>
                ))}
              </>
            ))}
        </ResponseMessage>
      </div>
    );
  }

  return <EmptyContent />;
};

export default ContentPage;
