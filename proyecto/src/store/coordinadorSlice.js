import { createSlice } from "@reduxjs/toolkit";
import localforage from "localforage";
import { nanoid } from "nanoid";
import { COORDINADOR_FORM_KEY, COORDINADOR_KEY } from "../constants/localKeys";

const initialState = {
    openCoordinadorSelector: false,
    selectedCoordinador: null,
    data: [],
    newForm: {
        id: nanoid(),
        image: "",
        name: "",
        email: "",
        billingAddress: "",
        mobileNo: "",
    },
    editedID: null,
    deletedID: null,
};

export const coordinadorSlice = createSlice({
    name: "coordinador",
    initialState,
    reducers: {
        addNewCoordinador: (state, action) => {
            const newDatas = [...state.data, action.payload];
            state.data = newDatas;
            localforage.setItem(COORDINADOR_KEY, newDatas);

            const reNewForm = {
                id: nanoid(),
                image: "",
                name: "",
                email: "",
                billingAddress: "",
                mobileNo: "",
            };
            state.newForm = {...reNewForm};
            localforage.setItem(COORDINADOR_FORM_KEY, reNewForm);
        },

        updateNewCoordinadorForm: (state, action) => {
            state.newForm = {...action.payload};
            localforage.setItem(COORDINADOR_FORM_KEY, {...state.newForm});
        },

        updateNewCoordinadorFormField: (state, action) => {
            state.newForm[action.payload.key] = action.payload.value;
            localforage.setItem(COORDINADOR_FORM_KEY, {...state.newForm});
        },

        setAllCoordinador: (state, action) => {
            state.data = action.payload;
        },

        setDeleteId: (state, action) => {
            state.deletedID = action.payload;
        },

        setEditedId: (state, action) => {
            state.editedID = action.payload;
        },

        onConfirmDeletedCoordinador: (state, action) => {
            const newDatas = state.data.filter(
                (coordinador) => coordinador.id !== state.deletedID
            );
            state.data = newDatas;
            state.deletedID = null;
            localforage.setItem(COORDINADOR_KEY, newDatas);
        },

        onConfirmEditCoordinador: (state, action) => {
            const isFindIndex = state.data.findIndex(
                (coordinador) => coordinador.id === state.editedID
            );
            if (isFindIndex !== -1) {
                state.data[isFindIndex] = {...action.payload};
            }
            state.editedID = null;
            localforage.setItem(COORDINADOR_KEY, [...state.data]);
        },

        setOpenCoordinadorSelector: (state, action) => {
            state.openCoordinadorSelector = action.payload;
            if (!action.payload) {
                state.selectedCoordinador = null;
            }
        },
        
        setCoordinadorSelector: (state, action) => {
            const isFindIndex = state.data.findIndex(
                (coordinador) => coordinador.id === action.payload
            );
            if (isFindIndex !== -1) {
                state.selectedCoordinador = state.data[isFindIndex];
            }
        },
    },
});

export const {
    addNewCoordinador,
    updateNewCoordinadorForm,
    updateNewCoordinadorFormField,
    setAllCoordinador,
    setDeleteId,
    setEditedId,
    onConfirmDeletedCoordinador,
    onConfirmEditCoordinador,
    setOpenCoordinadorSelector,
    setCoordinadorSelector,
} = coordinadorSlice.actions;

export const getAllCoordinadorSelector = (state) => state.coordinador.data;

export const getCoordinadorNewForm = (state) => state.coordinador.newForm;

export const getDeletedCoordinadorForm = (state) => state.coordinador.deletedID;

export const getEditedIdForm = (state) => state.coordinador.editedID;

export const getIsOpenCoordinadorSelector = (state) => state.coordinador.openCoordinadorSelector;

export const getSelectedCoordinador = (state) => state.coordinador.selectedCoordinador;

export default coordinadorSlice.reducer;