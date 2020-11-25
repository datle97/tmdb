// kết hợp các crew có cùng department
const sortByDepartment = (crew) => {
  return crew.reduce((acc, cur) => {
    // tìm index của department hiện tại co trong biến tích luý(acc) hay chưa
    const index = acc.findIndex((a) => a.department === cur.department);
    // nếu đã tồn tại thì thêm department hiện tại(cur) vào department đã có(acc[i].dât)
    if (index > -1) {
      acc[index].data.push(cur);
    } else {
      // nếu chưa tồn tại thì tạo thêm department mới vào acc(gồm tên department và các giá trị khác vào "data")
      acc.push({ department: cur.department, data: [cur] });
    }
    return acc.sort((a, b) =>
      // sắp xếp department theo thứ tự chữ cái
      a.department > b.department ? 1 : b.department > a.department ? -1 : 0
    );
  }, []);
};

export default sortByDepartment;
