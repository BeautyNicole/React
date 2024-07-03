import { Link } from 'react-router-dom'
import { Card, Breadcrumb, Form, Button, Radio, DatePicker, Select, Table, Tag, Space, Popconfirm, message } from 'antd'
import locale from 'antd/es/date-picker/locale/zh_CN';
import { EditOutlined, DeleteOutlined, ExclamationCircleOutlined, CheckCircleOutlined } from '@ant-design/icons'
import img404 from '@/assets/error.png'
import useChannelList from '@/hooks/useChannelList';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { getArticleList } from '@/store/modules/article';
import { deleteArticleByIdAPI } from '@/apis/articles';
import './index.scss';
import { useNavigate } from 'react-router-dom';


const { Option } = Select
const { RangePicker } = DatePicker

function Artical() {
    const navigate = useNavigate();
    // 定义文章审核状态枚举
    const articleStatus = {
        1: <Tag color='warning' icon={<ExclamationCircleOutlined />}>待审核</Tag>,
        2: <Tag color='success' icon={<CheckCircleOutlined />}>审核通过</Tag>
    };
    // 准备列数据
    const columns = [
        {
            title: '封面',
            dataIndex: 'cover',
            width: 120,
            render: cover => {
                return <img src={cover.images[0] || img404} width={45} height={45} alt="" />
            }
        },
        {
            title: '标题',
            dataIndex: 'title',
            width: 220
        },
        {
            title: '状态',
            dataIndex: 'status',
            // 根据文章状态显示不同的tag状态
            // data===1: 待审核
            // data===2: 审核通过
            // render: data => {
            //     console.log('article status===>', data);
            //     return articleStatus[data];
            // }
            render: data => articleStatus[data]
        },
        {
            title: '发布时间',
            dataIndex: 'pubdate'
        },
        {
            title: '阅读数',
            dataIndex: 'read_count'
        },
        {
            title: '评论数',
            dataIndex: 'comment_count'
        },
        {
            title: '点赞数',
            dataIndex: 'like_count'
        },
        {
            title: '操作',
            render: data => {
                return (
                    <Space size="middle">
                        <Button type="primary" shape="circle" icon={<EditOutlined onClick={() => navigate(`/publish?id=${data.id}`)} />} />
                        <Popconfirm
                            title="删除文章"
                            description="确定要删除文章？"
                            onConfirm={() => onConfirm(data)}
                            onCancel={onCancel}
                            okText="Yes"
                            cancelText="No"
                        >
                            <Button
                                type="primary"
                                danger
                                shape="circle"
                                icon={<DeleteOutlined />}
                            />
                        </Popconfirm>

                    </Space>
                )
            }
        }
    ];
    // 准备表格body数据
    const data = [
        {
            id: '8218',
            comment_count: 0,
            cover: {
                images: [],
            },
            like_count: 0,
            pubdate: '2019-03-11 09:00:00',
            read_count: 2,
            status: 2,
            title: 'wkwebview离线化加载h5资源解决方案'
        }
    ];

    const dispatch = useDispatch();
    const { channelList } = useChannelList();
    // 1. 准备api call参数
    const [reqData, setReqData] = useState({
        status: '',
        channel_id: '',
        begin_pubdate: '',
        end_pubdate: '',
        page: 1,
        per_page: 4
    });

    // dispatch or reqData 发生变化，会重新触发useEffect钩子函数
    useEffect(() => {
        dispatch(getArticleList(reqData));
    }, [dispatch, reqData]);

    const { articleList } = useSelector(state => state.article);

    const onFinish = (formValue) => {
        console.log('submitting searching form...', formValue);
        // 2. 把表单中的数据放到参数中（不可变方式）
        setReqData({
            ...reqData,
            channel_id: formValue.channel_id,
            status: formValue.status,
            begin_pubdate: formValue.date[0].format('YYYY-MM-DD'),
            end_pubdate: formValue.date[1].format('YYYY-MM-DD')
        });
        // 4. 重新拉取文章列表+ 渲染table （逻辑是重复的）

    }

    const onPageChange = (page) => {
        // 获取当前点击页
        console.log('current page===>', page);
        // 通过reqData 变化重新出发useEffect 钩子函数
        setReqData({
            ...reqData,
            page
        })
    }

    const onConfirm = async (data) => {
        console.log('delete article ====>', data);
        const res = await deleteArticleByIdAPI(data.id);
        if (res.data.message === 'OK') {
            message.success('文章删除成功！');
            setReqData({ ...reqData });
        } else {
            message.error('文章删除失败！')
        }

    }

    const onCancel = () => {
        message.info('文章删除取消！');
    }


    return (
        <div>
            <Card
                title={
                    <Breadcrumb items={[
                        { title: <Link to={'/'}>首页</Link> },
                        { title: '文章列表' },
                    ]} />
                }
                style={{ marginBottom: 20 }}
            >
                <Form initialValues={{ status: '' }} onFinish={onFinish}>
                    <Form.Item label="状态" name="status">
                        <Radio.Group>
                            <Radio value={''}>全部</Radio>
                            <Radio value={0}>草稿</Radio>
                            <Radio value={2}>审核通过</Radio>
                        </Radio.Group>
                    </Form.Item>

                    <Form.Item label="频道" name="channel_id">
                        <Select
                            placeholder="请选择文章频道"
                            defaultValue={channelList[0]?.name}
                            style={{ width: 120 }}
                        >
                            {channelList.map(item => <Option key={item.id} value={item.id}>{item.name}</Option>)}
                        </Select>
                    </Form.Item>

                    <Form.Item label="日期" name="date">
                        {/* 传入locale属性 控制中文显示*/}
                        <RangePicker locale={locale}></RangePicker>
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" style={{ marginLeft: 40 }}>
                            筛选
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
            {/* 表格区域 */}
            {articleList.length > 0 &&
                <Card title={`根据筛选条件共查询到 ${articleList.length} 条结果：`}>
                    <Table rowKey="id" columns={columns} dataSource={articleList}
                        pagination={{ count: articleList.length, pageSize: 2, position: ['bottomCenter'], onChange: onPageChange }}
                    />
                </Card>}

        </div>
    );
}

export default Artical;