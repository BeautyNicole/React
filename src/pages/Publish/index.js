import {
    Card,
    Breadcrumb,
    Form,
    Button,
    Radio,
    Input,
    Upload,
    Space,
    Select, 
    message
} from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { Link, useSearchParams } from 'react-router-dom'
import './index.scss'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useEffect, useState } from 'react';
import { createNewArticleAPI, fetchChannelsAPI, getArticleByIdAPI } from '@/apis/articles';
import useChannelList from '@/hooks/useChannelList';

const { Option } = Select

const Publish = () => {
    const [imageList, setImageList] = useState([]);
    const [imageType, setImageType] = useState(0);

    const {channelList} = useChannelList();
    
    const onFinish = async (formData) => {
        console.log('submitting form...');
        console.log(formData);
        if(imageList.length !== imageType) {
            return message.warning('封面类型和图片个数不匹配！');
        }
        const reqData = {
            title: formData.title,
            content: formData.content,
            cover: {
                type: imageType,
                images: imageList.map(item => item.response.data.url)
            },
            channel_id: formData.channel_id
        }

        const res = await createNewArticleAPI(reqData);
        alert('new created article id is ' + res.data.data.id);
    }
    const onChange = (value) => {
        console.log('Uploading image...');
        console.log(value);
        setImageList(value.fileList);
    }

    const imgTypeChange = (e) => {
        console.log('switching image type...', e);
        setImageType(e.target.value);
    }

    const [ articlePublishForm ] = Form.useForm();
    const [searchParams] = useSearchParams();
    const articleId = searchParams.get('id');
    console.log('chosed article id===>', articleId);

    useEffect(() => {
        async function getArticleById() {
            const res = await getArticleByIdAPI(articleId);
            articlePublishForm.setFieldsValue(res.data);
        }
        getArticleById();
    }, [articleId, articlePublishForm]);

    return (
        <div className="publish">
            <Card
                title={
                    <Breadcrumb items={[
                        { title: <Link to={'/'}>首页</Link> },
                        { title: '发布文章' },
                    ]}
                    />
                }
            >
                <Form
                    labelCol={{ span: 4 }}
                    wrapperCol={{ span: 16 }}
                    initialValues={{ type: 0 }}
                    onFinish={(e) => onFinish(e)}
                    form={articlePublishForm}
                >
                    <Form.Item
                        label="标题"
                        name="title"
                        rules={[{ required: true, message: '请输入文章标题' }]}
                    >
                        <Input placeholder="请输入文章标题" style={{ width: 400 }} />
                    </Form.Item>
                    <Form.Item
                        label="频道"
                        name="channel_id"
                        rules={[{ required: true, message: '请选择文章频道' }]}
                    >
                        <Select placeholder="请选择文章频道" style={{ width: 400 }}>
                            {channelList.map(item => <Option key={item.id} value={item.id}>{item.name}</Option>)}
                        </Select>
                    </Form.Item>
                    <Form.Item label="封面">
                        <Form.Item name="type">
                            <Radio.Group onChange={imgTypeChange}>
                                <Radio value={1}>单图</Radio>
                                <Radio value={3}>三图</Radio>
                                <Radio value={0}>无图</Radio>
                            </Radio.Group>
                        </Form.Item>
                        {imageType > 0 && <Upload
                            listType="picture-card"
                            showUploadList
                            action={'http://geek.itheima.net/v1_0/upload'}
                            name='image'
                            onChange={onChange}
                            fileList={imageList}
                            maxCount={imageType}>
                            <div style={{ marginTop: 8 }}>
                                <PlusOutlined />
                            </div>
                        </Upload>}

                    </Form.Item>
                    <Form.Item
                        label="内容"
                        name="content"
                        rules={[{ required: true, message: '请输入文章内容' }]}
                    >
                        <ReactQuill
                            className='publish-quill'
                            theme="snow"
                            placeholder="请输入文章内容"
                        />

                    </Form.Item>

                    <Form.Item wrapperCol={{ offset: 4 }}>
                        <Space>
                            <Button size="large" type="primary" htmlType="submit">
                                发布文章
                            </Button>
                        </Space>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    )
}

export default Publish