import React, {useState, useEffect} from "react";
import ReactDom from "react-dom";
import request from "../utils/myRequest";

import { Input , Select, Crud, Button, Modal, useCrudController, useModalController, useDatasource} from "tengitsui";
import Home from '../layout';

const schema = {
    name: {
        type: Input,
        name: "姓名",
        placeholder: "请输入",
        options: []
    },
    type: {
        type: Select,
        name: "工作",
        options: [{id:1,name:'aa'},{id:2,name:'bb'}],
        opts: {showSearch: true}
    },

    age: {
        type: Input,
        name: "年龄",
        placeholder: "请输入",
        rules: [
            {
                validator: value => (/^\d+$/.test(value) ? true : "年龄格式不正确")
            }
        ]
    }
};

const columns = {
    name: {
        name: "批次名称",
        filters: [{text: 'Joe', value: 'Joe'}, {text: 'Jim', value: 'Jim'}],
    },
    notifyCount: {
        name: "通知单数"
    },
    diseaseCount: {
        name: "病害数"
    },
    id: {
        name: "操作",
        render: ({value, record, modal, form, modal2}) => {
            return (
                <>
                    <Button
                        onClick={() => {
                            form.setFields(record);
                            modal.show();
                        }}
                    >
                        编辑
                    </Button>
                    <Button
                        onClick={() => {
                            modal2.show();
                        }}
                    >
                        查看
                    </Button>
                </>
            );
        }
    }
};

const data = {
    data: [
        {
            id: 1,
            name: "xxx",
            notifyCount: 2,
            diseaseCount: 3
        },
        {
            id: 2,
            name: "yyy",
            notifyCount: 3,
            diseaseCount: 4
        }
    ],
    pagination: {
        current: 2,
        pageSize: 10,
        total: 12
    }
};

const service = {
    list: async params => {
        console.log("list", params);
        // const task = request('/api/users').then(res=>{

        // });
        // const res = await task
        // console.log(111, res)
    },
    login: async params => {
        console.log("login", params);
        const task = request('/api/users/login').then(res=>{

        });
        const res = await task
    },
    add: async params => {
        console.log(params);
    },
    edit: async params => {
        console.log(params);
    },
    filter: async params => {
        console.log("filter", params);
    },
    submit: async params => {
        console.log(params);
    },
    testLogin: async ()=>{
        const task = request('/api/users/login', {
            username: 'test',
            password: '123456'
        }).then(res=>{

        });
        const res = await task
    }
};


const SomeDomainView = function ({crud, modal2, test}) {
    return (
        <Home>
            <Crud
                filter={crud.filter}
                modal={crud.modal}
                form={crud.form}
                list={crud.list}
                // FilterSchema={crud.FilterSchema}
                FormSchema={crud.FormSchema}
                ListSchema={crud.ListSchema}
                modal2={modal2}
            >
                <div key="CRUD-TABLE-TOP">
                    <Button onClick={() => crud.modal.show()}>显示弹窗</Button>
                </div>
            </Crud>
            <Modal
                visible={modal2.visible}
                maskClosable={false}
                onOk={() => {
                    modal2.close();
                }}
                onCancel={() => {
                    modal2.close();
                }}
            >
            </Modal>
        </Home>
    );
};

export default function Test() {
    const crud1 = useCrudController({
        FilterSchema: schema,
        FormSchema: schema,
        ListSchema: columns,
        service: service
    });


    const modal2 = useModalController({
            visible: false,
            loading: false
    });
    const {state: options} = useDatasource({
        service: async () => [
            {
                id: 1,
                name: "电工"
            },
            {id: 2, name: "木工"}
        ]
    });

    // 设置options
    useEffect(() => {
        schema.type.options = options;
    }, [options]);

    // 加载list

    useEffect(() => {
        crud1.list.doFetch();
        service.testLogin();
    }, []);

    return (
        <SomeDomainView crud={crud1}  modal2={modal2} test={123}/>
    );
}

