export default class applicantModel {
  constructor(id, name, email, contact, resumePath) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.contact = contact;
    this.resumePath = resumePath;
  }
  static addApplicant(id, name, email, contact, resumePath) {
    const newApplicant = new applicantModel(
      id,
      name,
      email,
      contact,
      resumePath
    );
    return newApplicant;
  }
}
