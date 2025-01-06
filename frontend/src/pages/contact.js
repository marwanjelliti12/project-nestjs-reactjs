import React, { useState, useEffect, useContext } from "react";
import AddContact from "../components/AddContact";
import UpdateContact from "../components/UpdateContact";
import AuthContext from "../AuthContext";

function Contact() {
  const [showContactModal, setShowContactModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [updateContact, setUpdateContact] = useState([]);
  const [Contacts, setAllContacts] = useState([]);
  const [searchTerm, setSearchTerm] = useState();
  const [updatePage, setUpdatePage] = useState(true);

  const authContext = useContext(AuthContext);

  console.log("====================================");
  console.log(authContext);
  console.log("====================================");
  
  useEffect(() => {
    fetchContactsData();
  }, [updatePage]);

  // Fetching Data of All Contacts
  // const fetchContactsData = () => {
  //   fetch(`http://localhost:3000/api/contact/get/${authContext.user}`)
  //     .then((response) => response.json())
  //     .then((data) => {
  //       setAllContacts(data);
  //     })
  //     .catch((err) => console.log(err));
  // };
  const fetchContactsData = () => {
    fetch(`http://localhost:3000/api/contact/get/${authContext.user}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch contacts.");
        }
        return response.json();
      })
      .then((data) => setAllContacts(data))
      .catch((err) => {
        console.log(err); // Log error to console
        alert(err.message); // Display error
      });
  };
  
  // const fetchContactsData = () => {
  //   fetch(`http://localhost:3000/api/contact/get/${authContext.user}`)
  //     .then((response) => {
  //       if (!response.ok) {
  //         throw new Error("Failed to fetch contacts.");
  //       }
  //       return response.json();
  //     })
  //     .then((data) => setAllContacts(data))
  //     .catch((err) => alert(err.message)); // Display error
  // };
  // Fetching Data of Search Contacts
  const fetchSearchData = () => {
    fetch(`http://localhost:3000/api/contact/search?searchTerm=${searchTerm}`)
      .then((response) => response.json())
      .then((data) => {
        setAllContacts(data);
      })
      .catch((err) => console.log(err));
  };

  // Modal for Contact ADD
  const addContactModalSetting = () => {
    setShowContactModal(!showContactModal);
  };

  // Modal for Contact UPDATE
  const updateContactModalSetting = (selectedContactData) => {
    setUpdateContact(selectedContactData);
    setShowUpdateModal(!showUpdateModal);
  };

  // Delete item
  const deleteContact = (id) => {
    fetch(`http://localhost:3000/api/contact/delete/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setUpdatePage(!updatePage);
      });
  };

  // Handle Page Update
  const handlePageUpdate = () => {
    setUpdatePage(!updatePage);
  };

  // Handle Search Term
  const handleSearchTerm = (e) => {
    setSearchTerm(e.target.value);
    fetchSearchData();
  };

  return (
    <div className="col-span-12 lg:col-span-10  flex justify-center">
      <div className="flex flex-col gap-5 w-11/12">
        <div className="bg-white rounded p-3">
          <span className="font-semibold px-4">Contacts</span>
          <div className="flex flex-col md:flex-row justify-center items-center">
            {/* Example Statistics */}
            <div className="flex flex-col p-10 w-full md:w-3/12">
              <span className="font-semibold text-blue-600 text-base">
                Total Contacts
              </span>
              <span className="font-semibold text-gray-600 text-base">
                {Contacts.length}
              </span>
            </div>
            <div className="flex flex-col gap-3 p-10 w-full md:w-3/12 sm:border-y-2 md:border-x-2 md:border-y-0">
              <span className="font-semibold text-yellow-600 text-base">
                Stores
              </span>
              <div className="flex gap-8">
                <div className="flex flex-col">
                  <span className="font-semibold text-gray-600 text-base">
                    5
                  </span>
                  <span className="font-thin text-gray-400 text-xs">
                    Last 7 days
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {showContactModal && (
          <AddContact
            addContactModalSetting={addContactModalSetting}
            handlePageUpdate={handlePageUpdate}
          />
        )}
        {showUpdateModal && (
          <UpdateContact
            updateContactData={updateContact}
            updateModalSetting={updateContactModalSetting}
          />
        )}

        {/* Table */}
        <div className="overflow-x-auto rounded-lg border bg-white border-gray-200">
          <div className="flex justify-between pt-5 pb-3 px-3">
            <div className="flex gap-4 justify-center items-center">
              <span className="font-bold">Contacts</span>
              <div className="flex justify-center items-center px-2 border-2 rounded-md">
                <img
                  alt="search-icon"
                  className="w-5 h-5"
                  src={require("../assets/search-icon.png")}
                />
                <input
                  className="border-none outline-none focus:border-none text-xs"
                  type="text"
                  placeholder="Search here"
                  value={searchTerm}
                  onChange={handleSearchTerm}
                />
              </div>
            </div>
            <div className="flex gap-4">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold p-2 text-xs  rounded"
                onClick={addContactModalSetting}
              >
                Add Contact
              </button>
            </div>
          </div>

          <table className="min-w-full divide-y-2 divide-gray-200 text-sm">
            <thead>
              <tr>
                <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                  Name
                </th>
                <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                  Email
                </th>
                <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                  Phone
                </th>
                <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                  Description
                </th>
                <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                  More
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200">
              {Contacts.map((element) => {
                return (
                  <tr key={element._id}>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-900">
                      {element.name}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                      {element.email}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                      {element.phone}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                      {element.description}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                      <span
                        className="text-green-700 cursor-pointer"
                        onClick={() => updateContactModalSetting(element)}
                      >
                        Edit{" "}
                      </span>
                      <span
                        className="text-red-600 px-2 cursor-pointer"
                        onClick={() => deleteContact(element._id)}
                      >
                        Delete
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Contact;
