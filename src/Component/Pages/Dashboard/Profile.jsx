import React, { useEffect, useState } from "react";
import { apiConnect } from "../../../api/apiConnect"; // Import apiConnect

const Profile = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");

  // Function to get the current user ID from local storage
  const getCurrentUserId = () => {
    const userId = localStorage.getItem("userId"); // Assuming the user ID is stored in local storage
    // console.log("Current User ID from localStorage:", userId);
    return userId;
  };

  const currentUserId = getCurrentUserId();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        // console.log("Fetching users...");
        const result = await apiConnect("api/users", "GET");
        // console.log("Fetched users:", result);
        const users = result;
        const currentUser = users.find((user) => user._id === currentUserId);
        // console.log("Current User:", currentUser);
        setUser(currentUser);
      } catch (error) {
        console.error("Error fetching users:", error);
        setError("Failed to fetch users. Please try again.");
      }
    };

    if (currentUserId) {
      fetchUsers();
    } else {
      setError("User not logged in.");
      console.error("User not logged in.");
    }
  }, [currentUserId]);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="mx-auto w-11/12 max-w-[1000px] py-10">
      <div className="py-10">
        <h1 className="mb-14 text-3xl font-medium text-richblack-5">
          Welcome , {user?.username}
        </h1>

        <div className="flex items-center justify-between rounded-md border-[1px] border-gray-700 bg-gray-800 p-3 md:p-8 md:px-12">
          <div className="flex items-center gap-x-4">
            <img
              src={
                user?.image ||
                "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJkAAACUCAMAAAC3HHtWAAAAZlBMVEX///8AAAD8/Pz09PT4+PgyMjLs7Ozk5OTNzc3v7+/Z2dldXV16enrc3Ny1tbV0dHQlJSWGhoapqam9vb1ra2uYmJg6OjpERERMTEyenp5WVlYVFRXHx8cNDQ1jY2NRUVGQkJAdHR1eKF0gAAAGnElEQVR4nO1c2baiMBCUfRHCooIoIP7/T844zswV6ISuELgvt1495FSW3qoTD4cf/OAH62FHQZDGaRBE9ndTecN2o1hcsmNdeV7+gudV9TG7iDhyv5FiFJbJw5LhkZRh9C20RFY/pbTeeNaZ2JlcII4LpL5wFMFuvMKiYvN6oSrCPWhFooZovVFvvqt2Iz/yajyaLW3Vb+6avF64N/5WxMR1Ba8XrmITXqHO+ZqiNm8LTmGA1wuFY5ZYa2LB3qhbg7zsxhivF8xZqX8zSsyyboaMtPUME7Msz8iOis44McvqDPgPUzY5RbGSl70Vsd/UVtmBw092cBxXeDY32ZCYZSWu9or1mxKzrF5z1extV+yFRO+sbXf4v6BloeUOxCyrxImdtnCwc3QnlFic70LMsvIYI+auTV/5uGK+Y4/T/w+QFZx2JGZZwFELdiVmWewifgcXOwbb4e7jyT7B9GrOmnJXD3deANWwy/wllgW+4wcvSU3DFbLsM36iw1Zl/DlnJy4xreg3nhx/C6Y+3S2cn187vIHBrV8mlmIj1jJndAJr53SJmJ1B4xVyWSzCzmu25DlCZBfuamsvESPvlrQYxMnel8LKCaGWqMfygaGey4pT+ATGU0sKF/5ArJwPyT8vyiUDDIoXUYBIV6sWDch+el4UtgH3qNqEM3sUj5u5BHwl6SwfJeLPr2ESOxwAVVDuHPmHIucn7y4/wMuPLl9f4S8ZsmhH2RAp+0hApRi/QPRkwZNvmYqzSoBvVzLrHNgjYDU///gO9AA2v/rFOpb8UuxKO0m+z7hDxA4HfmCn/UbL/v4GMuP3E2g1nm/dCwnLDPzUivZG/AiHeDNszmQ5ABgAKsfxjZM0ASD0og0QwR6ZTBQALW+7NSODS8tPP5XZJwF+ptxRxslf8g1tkzwoQF58BZkB0ip1UIDixMIaDDYwMnVQkJIa06NjYGRCFIKERswEkN0g5EdI0LghrSwHacMT8obNz+8sWeSlwc8UfuM8Z+ZCzBC/AenR53npg60ZkDtiEj6xZiAzfuMDk9EoZmATgNv4ANsxVGsAlLQ93iW8CLyGQu0F4nVeINZ9DvCM0J4SvpXEOWpwb4FKl4FcQzHKytmSuYZG53BQb6jNL63/gzIsSFP9i0wVpRxMwP8DUvsF6oAvVPIw1cItHktSBzg6I1ldQaurfqF1d6EiN0H3dlIRTmOdG+r24WkFTbur3/XNp/CVNr32XQ/aE61r6z+SphRlo3gwwAEd8/bu61OgUxhXywSMopII03tfOZhDlpCC8enpVd5zxe8EZIIJdEvpLMLg1dCXaVt9+ed3gSQbUskcuKb01Tx302Q+oTxJ/50YO+SXTvLLS9wIfBvHJL9MPo2nSspxXGi53AYZMW53v5yFENtPT02RnJOiOaX+LANxmJqJosvPmVym80go4OQdKmGaMbeFnEwGTq6mEgyDJWfr6b/WCJeyrEq5GQuLXoGXEkeIF6adqb9WfrvmpvVh8Rb4wqxVLX5lbs2iptqSeuFjRSq0eD9mGSopbKnod6T51cqt/Du8dEMfi8PLFu1h5sleJJs5QyehjZt9C2IJkhLNY3xKLlpu7tVZSGY0HGmJFB9NPtWj0kBCaiQQEh+afHtJ6UPMLZmVd1ezDy/9WR7IVTD9aRiB7/AvYHqUK/bMJ/uJ3c7gYLKfgHmN9tNbE8ZpxCPXgVzDH7nqFZmPDKOMCAsu8acy4Zl+eex/EuvALRk5navZV/jByDZhVznKjmuT1IJRpjXA34/9Yb14eZmNdERMx4eP8yFjZjAuB5ZzHwrjciU3EzrFKJ6rixIFtXHCYuAl+eRVu35qNZFgbmvtIBhX2ujzsNFQkzRPrMk57En6sy4ZjSfUzvpO158Ey7VBz53m7YNePRBN1YOH9lPc/0NOC7Fa48nloZzWsZmJgmeYqvuVwKzUEdOErxsM8DpQNcsN+HsRv5lrX8ZS0WBev+ZZyFk4J8zmpdLRYBR2KfXrOrTqlfPbgVJ+h9VnfwRS/eq8vkkdysfZTtr0HtV+Mp+HuoPsvu6xaEQYB37kOE7kB3EomkImX9wNL9gbseJa6z2v6vp6vdZ1lStuHPfmS4o3wnV/N9Bv+CdQrlYL+o2q3WIjPxCfdV6q5+et9vEDdjqg3PIh3esP5E4Z/6KCl5kWH9RIxZnTLO/Owlxtw4YTXvpKvrF51V9YEWwb+KG4ZLeJs++8W3YR4Wb/KcaG7TpRELcnUZalOLVxEDnf+Y+JP/jBD7bFL7gNXoJEaJwYAAAAAElFTkSuQmCC"
              }
              alt={`profile-${user?.username}`}
              className="aspect-square w-[78px] rounded-full object-cover"
            />
            <div className="space-y-1">
              <p className="text-lg font-semibold text-white">
                {user?.username}
              </p>
              <p className="text-sm text-gray-400 break-words">{user?.email}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
