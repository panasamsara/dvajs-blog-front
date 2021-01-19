import React, {useState, useEffect} from "react";
import ReactDom from "react-dom";
import request from "../utils/myRequest";

import { 
  Input , 
  Select, 
  Crud, 
  Button, 
  Modal, 
  Form,
  useCrudController, 
  useModalController, 
  useFormController,
} from "tengitsui";
import { Row, Col, message, DatePicker, Card } from 'antd';
import Home from '../layout';

const schema = {
    title: {
        type: Input,
        name: "标题",
        placeholder: "请输入",
        options: []
    },
    content: {
        type: Input,
        name: "内容",
        // options: [{id:1,name:'aa'},{id:2,name:'bb'}],
        // opts: {showSearch: true}
    },

    // age: {
    //     type: Input,
    //     name: "年龄",
    //     placeholder: "请输入",
    //     rules: [
    //         {
    //             validator: value => (/^\d+$/.test(value) ? true : "年龄格式不正确")
    //         }
    //     ]
    // }
};


const service = {
    list: async params => {
        console.log("list", params);
        const task = request('/api/getArticles');
        const res = await task;
        return res;
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
        if(params.id){
          const task = request('/api/updateArticle', {params});
          const res = await task;
        }else{
          const task = request('/api/saveArticle', {params});
          const res = await task;
        }
    },

};


const SomeDomainView = function ({crud, modal2, detailData}) {
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
                    <Button onClick={() => crud.modal.show()}>新增</Button>
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
              <div className='modal-set'>
                <Row>
                    <Col >
                        标题：{detailData.title}
                    </Col>
                </Row>
                <Row>
                    <Col >
                        内容：{detailData.content}
                    </Col>
                </Row>
              </div>
            </Modal>
        </Home>
    );
};

export default function Index() {
  const [detailData, setDetailData] = useState([{}]);
  const showDetail = (record) => {
      setDetailData(record)
  };
  const columns = {
    title: {
        name: "标题"
    },
    content: {
        name: "内容"
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
                          showDetail(record)
                        }}
                    >
                        查看
                    </Button>
                </>
            );
        }
    }
  };
  []
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
  const editForm = useFormController({
    schema: schema,
    doSubmit: service.submit,
  })

  // 设置options
  // useEffect(() => {
  //     schema.type.options = options;
  // }, [options]);

  // 加载list
  useEffect(() => {
      crud1.list.doFetch();
  }, []);

  return (
      <SomeDomainView crud={crud1}  modal2={modal2} detailData={detailData}/>
  );
}

