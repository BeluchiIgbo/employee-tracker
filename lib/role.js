
class Role {

    constructor(connection) {
      this.connection = connection;
    }

    async viewAll() {
      try {
        const query = `
          SELECT role.id, role.title, department.name AS department, role.salary
          FROM role
          INNER JOIN department ON role.department_id = department.id`;
        const [roles] = await this.connection.promise().query(query);
        console.table(roles);
      } catch (error) {

        console.error('Error viewing roles:', error);
        throw error;
      }
    }


    async getAllRoles() {
      const query = 'SELECT id, title FROM role';
      const [roles] = await this.connection.promise().query(query);
      return roles.map(role => ({ name: role.title, value: role.id }));
    }    


    async add(title, salary, department_id) {
      try {
        const query = 'INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)';
        const [result] = await this.connection.promise().query(query, [title, salary, department_id]);
        console.log(`Added role: ${title}`);
      } catch (error) {
        console.error('Error adding role:', error);
        throw error;
      }
    }
  }

  module.exports = Role;
  