
class Department {
    constructor(connection) {
      this.connection = connection;
    }

    async viewAll() {
      try {
        const query = 'SELECT id, name FROM department';
        const [departments] = await this.connection.promise().query(query);
        console.table(departments);
      } catch (error) {

        console.error('Error viewing departments:', error);
        throw error;
      }
    }

    async getAllDepartments() {
      const query = 'SELECT id, name FROM department';
      const [departments] = await this.connection.promise().query(query);
      return departments.map(dept => ({ name: dept.name, value: dept.id }));
    }    


    async add(name) {
      try {
        const query = 'INSERT INTO department (name) VALUES (?)';
        const [result] = await this.connection.promise().query(query, [name]);
        console.log(`Added department: ${name}`);
      } catch (error) {

        console.error('Error adding department:', error);
        throw error;
      }
    }
  
  }
  
  module.exports = Department;
  