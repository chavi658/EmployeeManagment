const [selectedRoles, setSelectedRoles] = useState({});

// כאשר מתבצעת השינוי
const handleRoleSelection = (event, roleId) => {
  const isChecked = event.target.checked;
  setSelectedRoles(prevRoles => ({
    ...prevRoles,
    [roleId]: isChecked
  }));
};

// בסינון של התפקידים
const filteredRoles = roleNames.filter(role => !selectedRoles[role.roleId]);


const uniqueRoles = {};
response.data.forEach(role => {
  if (!uniqueRoles[role.roleId]) {
    uniqueRoles[role.roleId] = role;
  }
});
const uniqueRolesArray = Object.values(uniqueRoles);
setRoleNames(uniqueRolesArray);


const roleSet = new Set(response.data.map(role => role.roleId));
const uniqueRoles = Array.from(roleSet).map(roleId => response.data.find(role => role.roleId === roleId));
setRoleNames(uniqueRoles);

useEffect(() => {
  getEmpployee()
   .then(response => {
    const roleArray = response.data;
    const uniqueRoles = roleArray.filter((role, index) => roleArray.findIndex(obj => obj.roleId === role.roleId) === index);
    setRoleNames(uniqueRoles);
  })
  .catch(error => console.error(error));
 
}, []);
