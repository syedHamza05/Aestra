

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import axios from "axios"; // Import axios for API requests

const EmployeeForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();

  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  useEffect(() => {
    // Fetch countries from API
    axios.get(`${process.env.REACT_APP_BASE_URL}/countries`)
      .then(response => {
        const countriesData = response.data.map(country => ({
          value: country.code,
          label: country.name,
        }));
        setCountries(countriesData);
      })
      .catch(error => {
        console.error("Error fetching countries", error);
      });
  }, []);

  const handleCountryChange = (selectedOption) => {
    // Fetch states for the selected country from API
    const countryCode = selectedOption.value;
    axios.get(`${process.env.REACT_APP_BASE_URL}/states/${countryCode}`)
      .then(response => {
        const statesData = response.data.map(state => ({
          value: state.code,
          label: state.name,
        }));
        setStates(statesData);
      })
      .catch(error => {
        console.error("Error fetching states", error);
      });
  };

  const handleStateChange = (selectedOption) => {
    // Fetch cities for the selected state from API
    const stateCode = selectedOption.value;
    axios.get(`${process.env.REACT_APP_BASE_URL}/cities/${stateCode}`)
      .then(response => {
        const citiesData = response.data.map(city => ({
          value: city.code,
          label: city.name,
        }));
        setCities(citiesData);
      })
      .catch(error => {
        console.error("Error fetching cities", error);
      });
  };

  const createEmployee = async (data) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}/createUser`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        console.log("User created successfully", result);
        // You can display a success message or redirect to another page
        navigate("/");
      } else {
        console.error("Failed to create user", result);
        // You can display an error message to the user
      }
    } catch (error) {
      console.error("Error creating user", error);
      // You can display an error message to the user
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(createEmployee)} className="mt-8">
        <div className="space-y-5">
          <div>
            {/* First Name input */}
            <label
              htmlFor="firstName"
              className="text-base font-medium text-gray-900 dark:text-gray-200"
            >
              First Name
            </label>
            <div className="mt-2.5">
              <input
                className={`flex h-10 w-full rounded-md border ${errors.firstName ? 'border-red-500' : 'border-gray-300'} bg-transparent py-2 px-3 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:text-gray-50 dark:focus:ring-gray-400 dark:focus:ring-offset-gray-900`}
                type="text"
                placeholder="Enter Your First Name"
                {...register("firstName", {
                  required: "First Name is required",
                  pattern: {
                    value: /^[A-Za-z\s]+$/,
                    message: "First Name must contain alphabets only",
                  }
                })}
              />
              {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName.message}</p>}
            </div>
          </div>

          <div>
            {/* Last Name input */}
            <label
              htmlFor="lastName"
              className="text-base font-medium text-gray-900 dark:text-gray-200"
            >
              Last Name
            </label>
            <div className="mt-2.5">
              <input
                className={`flex h-10 w-full rounded-md border ${errors.lastName ? 'border-red-500' : 'border-gray-300'} bg-transparent py-2 px-3 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:text-gray-50 dark:focus:ring-gray-400 dark:focus:ring-offset-gray-900`}
                type="text"
                placeholder="Enter Your Last Name"
                {...register("lastName", {
                  required: "Last Name is required",
                  pattern: {
                    value: /^[A-Za-z\s]+$/,
                    message: "Last Name must contain alphabets only",
                  }
                })}
              />
              {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName.message}</p>}
            </div>
          </div>

          <div>
            {/* Date of Birth input */}
            <label
              htmlFor="dob"
              className="text-base font-medium text-gray-900 dark:text-gray-200"
            >
              Date of Birth
            </label>
            <div className="mt-2.5">
              <input
                className={`flex h-10 w-full rounded-md border ${errors.dob ? 'border-red-500' : 'border-gray-300'} bg-transparent py-2 px-3 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:text-gray-50 dark:focus:ring-gray-400 dark:focus:ring-offset-gray-900`}
                type="date"
                {...register("dob", {
                  required: "Date of Birth is required",
                })}
              />
              {errors.dob && <p className="text-red-500 text-xs mt-1">{errors.dob.message}</p>}
            </div>
          </div>

          <div>
            {/* Age input */}
            <label
              htmlFor="age"
              className="text-base font-medium text-gray-900 dark:text-gray-200"
            >
              Age
            </label>
            <div className="mt-2.5">
              <input
                className={`flex h-10 w-full rounded-md border ${errors.age ? 'border-red-500' : 'border-gray-300'} bg-transparent py-2 px-3 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:text-gray-50 dark:focus:ring-gray-400 dark:focus:ring-offset-gray-900`}
                type="number"
                placeholder="Enter Your Age"
                {...register("age", {
                  required: "Age is required",
                  min: {
                    value: 18,
                    message: "You must be at least 18 years old",
                  },
                })}
              />
              {errors.age && <p className="text-red-500 text-xs mt-1">{errors.age.message}</p>}
            </div>
          </div>

          <div>
            {/* Email input */}
            <label
              htmlFor="email"
              className="text-base font-medium text-gray-900 dark:text-gray-200"
            >
              Employee Email Id
            </label>
            <div className="mt-2.5">
              <input
                className={`flex h-10 w-full rounded-md border ${errors.email ? 'border-red-500' : 'border-gray-300'} bg-transparent py-2 px-3 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:text-gray-50 dark:focus:ring-gray-400 dark:focus:ring-offset-gray-900`}
                type="email"
                placeholder="Enter Your Email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/i,
                    message: "Invalid email format",
                  }
                })}
              />
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
            </div>
          </div>

          <div>
            {/* Country dropdown */}
            <label htmlFor="country" className="text-base font-medium text-gray-900 dark:text-gray-200">
              Employee Country
            </label>
            <div className="mt-2.5">
              <Select
                options={countries}
                onChange={handleCountryChange}
                {...register("country", {
                  required: "Country is required",
                })}
              />
              {errors.country && <p className="text-red-500 text-xs mt-1">{errors.country.message}</p>}
            </div>
          </div>

          <div>
            {/* State dropdown */}
            <label htmlFor="state" className="text-base font-medium text-gray-900 dark:text-gray-200">
              Employee State
            </label>
            <div className="mt-2.5">
              <Select
                options={states}
                onChange={handleStateChange}
                {...register("state", {
                  required: "State is required",
                })}
              />
              {errors.state && <p className="text-red-500 text-xs mt-1">{errors.state.message}</p>}
            </div>
          </div>

          <div>
            {/* City dropdown */}
            <label htmlFor="city" className="text-base font-medium text-gray-900 dark:text-gray-200">
              Employee City
            </label>
            <div className="mt-2.5">
              <Select
                options={cities}
                {...register("city", {
                  required: "City is required",
                })}
              />
              {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city.message}</p>}
            </div>
          </div>

          <div>
            {/* Gender input */}
            <label
              className="block text-base font-medium text-gray-900 dark:text-gray-200"
            >
              Employee Gender
            </label>
            <div className="mt-2.5 space-y-2">
              <label className="flex items-center">
                <input
                  type="radio"
                  className="h-4 w-4 text-indigo-600 dark:bg-indigo-700 dark:checked:bg-indigo-600 dark:checked:border-transparent"
                  {...register("gender", {
                    required: "Gender is required",
                  })}
                  value="male"
                />
                <span className="ml-2 text-sm text-gray-700 dark:text-gray-200">Male</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  className="h-4 w-4 text-indigo-600 dark:bg-indigo-700 dark:checked:bg-indigo-600 dark:checked:border-transparent"
                  {...register("gender", {
                    required: "Gender is required",
                  })}
                  value="female"
                />
                <span className="ml-2 text-sm text-gray-700 dark:text-gray-200">Female</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  className="h-4 w-4 text-indigo-600 dark:bg-indigo-700 dark:checked:bg-indigo-600 dark:checked:border-transparent"
                  {...register("gender", {
                    required: "Gender is required",
                  })}
                  value="other"
                />
                <span className="ml-2 text-sm text-gray-700 dark:text-gray-200">Other</span>
              </label>
            </div>
            {errors.gender && <p className="text-red-500 text-xs mt-1">{errors.gender.message}</p>}
          </div>

          <div>
            {/* Phone input */}
            <label
              htmlFor="phone"
              className="text-base font-medium text-gray-900 dark:text-gray-200"
            >
              Employee Phone Number
            </label>
            <div className="mt-2.5">
              <input
                className={`flex h-10 w-full rounded-md border ${errors.phone ? 'border-red-500' : 'border-gray-300'} bg-transparent py-2 px-3 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:text-gray-50 dark:focus:ring-gray-400 dark:focus:ring-offset-gray-900`}
                type="text"
                placeholder="Enter Your Phone Number"
                {...register("phone", {
                  required: "Phone Number is required",
                  pattern: {
                    value: /^[0-9]{10}$/,
                    message: "Invalid phone number format",
                  }
                })}
              />
              {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="inline-flex w-full items-center justify-center rounded-md bg-indigo-600 px-3.5 py-2.5 text-base font-semibold leading-7 text-white hover:bg-indigo-500"
            >
              Create Employee
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="ml-2 h-4 w-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75"
                />
              </svg>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EmployeeForm;
