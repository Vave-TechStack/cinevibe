"use client";

import React, { createContext, useContext, useReducer, useCallback, ReactNode } from "react";
import { BookingDraft, FoodOrderItem, PaymentMethod } from "./types";

interface BookingState {
  draft: BookingDraft | null;
}

type BookingAction =
  | { type: "SET_DRAFT"; payload: BookingDraft }
  | { type: "UPDATE_DRAFT"; payload: Partial<BookingDraft> }
  | { type: "SET_SEATS"; payload: string[] }
  | { type: "SET_FOOD"; payload: FoodOrderItem[] }
  | { type: "SET_CUSTOMER"; payload: { name: string; mobile: string; email: string } }
  | { type: "SET_PAYMENT_METHOD"; payload: PaymentMethod }
  | { type: "CLEAR_DRAFT" };

const initialState: BookingState = { draft: null };

function bookingReducer(state: BookingState, action: BookingAction): BookingState {
  switch (action.type) {
    case "SET_DRAFT":
      return { ...state, draft: action.payload };
    case "UPDATE_DRAFT":
      if (!state.draft) return state;
      return { ...state, draft: { ...state.draft, ...action.payload } };
    case "SET_SEATS":
      if (!state.draft) return state;
      return { ...state, draft: { ...state.draft, seats: action.payload } };
    case "SET_FOOD":
      if (!state.draft) return state;
      return { ...state, draft: { ...state.draft, foodItems: action.payload } };
    case "SET_CUSTOMER":
      if (!state.draft) return state;
      return { ...state, draft: { ...state.draft, ...action.payload } };
    case "SET_PAYMENT_METHOD":
      if (!state.draft) return state;
      return { ...state, draft: { ...state.draft, paymentMethod: action.payload } };
    case "CLEAR_DRAFT":
      return { ...state, draft: null };
    default:
      return state;
  }
}

interface BookingContextValue {
  draft: BookingDraft | null;
  setDraft: (draft: BookingDraft) => void;
  updateDraft: (updates: Partial<BookingDraft>) => void;
  setSeats: (seats: string[]) => void;
  setFood: (items: FoodOrderItem[]) => void;
  setCustomer: (name: string, mobile: string, email: string) => void;
  setPaymentMethod: (method: PaymentMethod) => void;
  clearDraft: () => void;
}

const BookingContext = createContext<BookingContextValue | undefined>(undefined);

export function BookingProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(bookingReducer, initialState);

  const setDraft = useCallback((draft: BookingDraft) => dispatch({ type: "SET_DRAFT", payload: draft }), []);
  const updateDraft = useCallback((updates: Partial<BookingDraft>) => dispatch({ type: "UPDATE_DRAFT", payload: updates }), []);
  const setSeats = useCallback((seats: string[]) => dispatch({ type: "SET_SEATS", payload: seats }), []);
  const setFood = useCallback((items: FoodOrderItem[]) => dispatch({ type: "SET_FOOD", payload: items }), []);
  const setCustomer = useCallback((name: string, mobile: string, email: string) =>
    dispatch({ type: "SET_CUSTOMER", payload: { name, mobile, email } }), []);
  const setPaymentMethod = useCallback((method: PaymentMethod) =>
    dispatch({ type: "SET_PAYMENT_METHOD", payload: method }), []);
  const clearDraft = useCallback(() => dispatch({ type: "CLEAR_DRAFT" }), []);

  return (
    <BookingContext.Provider
      value={{
        draft: state.draft,
        setDraft,
        updateDraft,
        setSeats,
        setFood,
        setCustomer,
        setPaymentMethod,
        clearDraft,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
}

export function useBooking(): BookingContextValue {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error("useBooking must be used within a BookingProvider");
  }
  return context;
}
