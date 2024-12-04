import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { FaUser, FaCalendarAlt, FaUsers, FaCreditCard } from "react-icons/fa";
import api from "../api/axios";

const BookingForm = ({ hotel, onSuccess }) => {
  const [step, setStep] = useState(1);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    trigger,
  } = useForm({
    defaultValues: {
      guests: 1,
      roomType: "standard",
    },
  });

  const checkInDate = watch("checkInDate");
  const checkOutDate = watch("checkOutDate");
  const roomType = watch("roomType");

  const calculateTotal = () => {
    if (!checkInDate || !checkOutDate) return hotel.pricePerNight;
    const nights = Math.ceil(
      (new Date(checkOutDate) - new Date(checkInDate)) / (1000 * 60 * 60 * 24)
    );
    const basePrice = hotel.pricePerNight;
    const roomMultiplier =
      roomType === "standard" ? 1 : roomType === "deluxe" ? 1.5 : 2;
    return nights * basePrice * roomMultiplier;
  };

  const bookingMutation = useMutation({
    mutationFn: async (formData) => {
      const bookingData = {
        id: Date.now(),
        hotelId: hotel.id,
        guestName: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
        phone: formData.phone,
        checkInDate: formData.checkInDate,
        checkOutDate: formData.checkOutDate,
        numberOfGuests: parseInt(formData.guests),
        roomType: formData.roomType,
        totalAmount: calculateTotal(),
        status: "confirmed",
        hotelName: hotel.name,
      };

      try {
        const response = await api.post("/bookings", bookingData);
        return response.data;
      } catch (error) {
        console.error("Booking error:", error);
        if (error.response?.status === 500) {
          throw new Error(
            "Server error. Please try again later or contact support."
          );
        }
        throw new Error(error.message || "Failed to make booking");
      }
    },
    onSuccess: () => {
      // Wait for 2 seconds before redirecting
      setTimeout(() => {
        onSuccess?.();
      }, 2000);
    },
  });

  const nextStep = async () => {
    const fields =
      step === 1
        ? ["firstName", "lastName", "email", "phone"]
        : ["checkInDate", "checkOutDate", "guests", "roomType"];

    const isValid = await trigger(fields);
    if (isValid) setStep(step + 1);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      {/* Step Indicator */}
      <div className="flex items-center justify-center mb-8">
        {[1, 2].map((i) => (
          <React.Fragment key={i}>
            <div
              className={`rounded-full h-8 w-8 flex items-center justify-center ${
                step === i
                  ? "bg-indigo-600 text-white"
                  : step > i
                  ? "bg-green-500 text-white"
                  : "bg-gray-200"
              }`}
            >
              {step > i ? "✓" : i}
            </div>
            {i < 2 && (
              <div
                className={`h-1 w-10 ${
                  step > i ? "bg-green-500" : "bg-gray-200"
                }`}
              />
            )}
          </React.Fragment>
        ))}
      </div>

      <form
        onSubmit={handleSubmit((data) => bookingMutation.mutate(data))}
        className="space-y-6"
      >
        {step === 1 && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-4"
          >
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  First Name
                </label>
                <div className="mt-1 relative">
                  <input
                    {...register("firstName", {
                      required: "First name is required",
                    })}
                    className="block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
                {errors.firstName && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.firstName.message}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Last Name
                </label>
                <div className="mt-1 relative">
                  <input
                    {...register("lastName", {
                      required: "Last name is required",
                    })}
                    className="block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
                {errors.lastName && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.lastName.message}
                  </p>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address",
                  },
                })}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Phone
              </label>
              <input
                type="tel"
                {...register("phone", { required: "Phone number is required" })}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              />
              {errors.phone && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.phone.message}
                </p>
              )}
            </div>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-4"
          >
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Check-in Date
                </label>
                <input
                  type="date"
                  {...register("checkInDate", {
                    required: "Check-in date is required",
                  })}
                  min={new Date().toISOString().split("T")[0]}
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                />
                {errors.checkInDate && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.checkInDate.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Check-out Date
                </label>
                <input
                  type="date"
                  {...register("checkOutDate", {
                    required: "Check-out date is required",
                    validate: (value) =>
                      !checkInDate ||
                      new Date(value) > new Date(checkInDate) ||
                      "Must be after check-in date",
                  })}
                  min={checkInDate}
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                />
                {errors.checkOutDate && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.checkOutDate.message}
                  </p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Number of Guests
                </label>
                <select
                  {...register("guests")}
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                >
                  {[1, 2, 3, 4].map((num) => (
                    <option key={num} value={num}>
                      {num} Guest{num > 1 ? "s" : ""}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Room Type
                </label>
                <select
                  {...register("roomType")}
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                >
                  <option value="standard">Standard Room</option>
                  <option value="deluxe">Deluxe Room</option>
                  <option value="suite">Suite</option>
                </select>
              </div>
            </div>

            <div className="mt-4 p-4 bg-gray-50 rounded-lg">
              <div className="flex justify-between items-center">
                <span className="text-gray-700">Total Price:</span>
                <span className="text-2xl font-bold text-indigo-600">
                  ${calculateTotal()}
                </span>
              </div>
            </div>

            <button
              type="submit"
              disabled={bookingMutation.isLoading}
              className="w-full px-4 py-2 text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
            >
              {bookingMutation.isLoading ? (
                <div className="flex items-center justify-center">
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Processing...
                </div>
              ) : (
                "Confirm Booking"
              )}
            </button>
          </motion.div>
        )}

        <div className="flex justify-between mt-6">
          {step > 1 && (
            <button
              type="button"
              onClick={() => setStep(step - 1)}
              className="px-4 py-2 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50"
            >
              Previous
            </button>
          )}
          {step === 1 && (
            <button
              type="button"
              onClick={nextStep}
              className="px-4 py-2 text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
            >
              Next
            </button>
          )}
        </div>

        {bookingMutation.isSuccess && (
          <div className="mt-4 p-4 bg-green-50 rounded-md border border-green-200">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg
                  className="h-5 w-5 text-green-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-green-800">
                  Booking Successful!
                </h3>
                <div className="mt-2 text-sm text-green-700">
                  <p>
                    Your reservation has been confirmed. A confirmation email
                    will be sent shortly.
                  </p>
                </div>
                <div className="mt-4">
                  <button
                    type="button"
                    onClick={() => onSuccess?.()}
                    className="text-sm font-medium text-green-600 hover:text-green-500"
                  >
                    Return to Hotel List ➔
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {bookingMutation.isError && (
          <div className="mt-4 p-4 bg-red-50 rounded-md">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg
                  className="h-5 w-5 text-red-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-red-800">
                  {bookingMutation.error?.message ||
                    "Error making booking. Please try again."}
                </p>
                <div className="mt-2 text-sm text-red-700">
                  <p>
                    Please check your details and try again. If the problem
                    persists, contact support.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default BookingForm;
