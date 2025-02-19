import React from "react";
import { Form, Select } from "antd";

const SelectTree = ({ category, parent_id }) => {
    // Hàm đệ quy để hiển thị danh mục
    const renderCategory = (categories, level = 0) => {
        return categories.map((item) => {
            const prefix = Array(level).fill(" -- ").join(""); // Tiền tố
            return (
                <React.Fragment key={item._id}>
                    <Select.Option value={item._id}>
                        {prefix}
                        {item.title}
                    </Select.Option>
                    {item.child && Array.isArray(item.child) && item.child.length > 0 &&
                        renderCategory(item.child, level + 1)}
                </React.Fragment>
            );
        });
    };

    return (
        <Form.Item label="Danh mục" name="category">
            <Select placeholder="Chọn danh mục" allowClear>
                {category && renderCategory(category)}
            </Select>
        </Form.Item>
    );
};

export default SelectTree;
