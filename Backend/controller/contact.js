
// // Exemple d'une méthode pour ajouter un contact
// // exports.addContact = async (req, res) => {
// //   try {
// //     const { userId, name, email, phone, description } = req.body;

// //     const newContact = new Contact({
// //       userId,
// //       name,
// //       email,
// //       phone,
// //       description,
// //     });

// //     const savedContact = await newContact.save();
// //     res.status(201).json(savedContact);
// //   } catch (err) {
// //     res.status(500).json({ message: "Error adding contact", error: err });
// //   }


// const Contact = require("../models/contact");

// const addContact = (req, res) => {
//   console.log("req: ", req.body.userId);
//   const addContact = new Contact({
//     userID: req.body.userId,
//     name: req.body.name,
//     email: req.body.email,
//     phone: req.body.phone,
//     description: req.body.description,
//   });

//   addContact
//     .save()
//     .then((result) => {
//       res.status(200).send(result);
//     })
//     .catch((err) => {
//       res.status(402).send(err);
//     });
// };

// // Get All Contact

// const getAllContacts = async (req, res) => {
//   const findAllContacts = await Contact.find({
//     userID: req.params.userId,
//   }).sort({ _id: -1 }); // -1 for descending;
//   res.json(findAllContacts);
// };
// // Update Contact
// const updateContact = async (req, res) => {
//   try {
//     const updatedContact = await Contact.findByIdAndUpdate(
//       { _id: req.params.contactId },
//       {
//         name: req.body.name,
//         email: req.body.email,
//         phone: req.body.phone,
//         description: req.body.description,
//       },
//       { new: true } // Return the updated document
//     );
//     console.log(updatedContact);
//     res.json(updatedContact);
//   } catch (error) {
//     console.log(error);
//     res.status(402).send("Error updating contact");
//   }
// };

// module.exports = {
//   addContact,
//   getAllContacts,
//   updateContact,
// };

const Contact = require("../models/contact");

// Add Contact
const addContact = async (req, res) => {
  try {
    const { userId, name, email, phone, description } = req.body;

    // Validate required fields
    if (!userId || !name || !email || !phone) {
      return res.status(400).send({ message: "All fields are required." });
    }

    const newContact = new Contact({
      userID: userId,
      name,
      email,
      phone,
      description,
    });

    const savedContact = await newContact.save();
    res.status(201).json(savedContact);
  } catch (err) {
    console.error("Error adding contact:", err);
    res.status(500).send({ message: "Failed to add contact", error: err });
  }
};

// Get All Contacts
const getAllContacts = async (req, res) => {
  try {
    const userId = req.params.userId;
    const contacts = await Contact.find({ userID: userId }).sort({ _id: -1 });
    res.status(200).json(contacts);
  } catch (err) {
    console.error("Error fetching contacts:", err);
    res.status(500).send({ message: "Failed to fetch contacts", error: err });
  }
};

// Update Contact
const updateContact = async (req, res) => {
  try {
    const contactId = req.params.contactId;
    const updatedData = {
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      description: req.body.description,
    };

    const updatedContact = await Contact.findByIdAndUpdate(contactId, updatedData, {
      new: true, // Return the updated document
    });

    if (!updatedContact) {
      return res.status(404).send({ message: "Contact not found" });
    }

    res.status(200).json(updatedContact);
  } catch (err) {
    console.error("Error updating contact:", err);
    res.status(500).send({ message: "Failed to update contact", error: err });
  }
};

module.exports = {
  addContact,
  getAllContacts,
  updateContact,
};
