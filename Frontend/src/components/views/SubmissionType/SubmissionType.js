import React,  {useEffect, useState, Fragment} from "react";
import { withRouter } from "react-router-dom";
import axios from "axios";
import download from 'downloadjs';
import {Typography, Divider } from "antd";
import {DownloadOutlined} from '@ant-design/icons';

const { Title, Text } = Typography;

function SubmissionType(props){

    const[Submission,setSubmissions] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8080/submissionT/')
            .then(response => {
                console.log(response.data);
                setSubmissions(response.data.submissiontypes);
            })
            .catch(err => {
                console.log(err);
            })
    },[])
    const downloadFile = async(link) => {
        console.log(link);
        await axios.get(`http://localhost:8080/submissionTypeUpload/`+link)
            .then(response => {

                console.log(response);
                return download(response.data);

            }).catch(error => {
                console.log(error);
            })
    }

    return(
        <div style={{ maxWidth: '700px', margin: '2rem auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                <Title level={2}> Submissions </Title>
            </div>
            {Submission.length > 0 && Submission.map((item,index) => (
                <Fragment key={index}>
                    <Divider />
                    <Title level={4}>
                        {item.topic}
                    </Title>
                    <p>
                        {item.description}
                    </p>
                    <a>
                        <DownloadOutlined onClick={() => downloadFile(item.link)}/>
                    </a>
                    <br/>
                    <p>
                        {item.Exp_Date}
                    </p>
                    <br/>
                    <a href={"/submissionUpload"}></a>
                    <br/>
                    <Text strong>
                        {item.author != null && item.author.name}
                    </Text>
                </Fragment>
            ))}

        </div>
    )
}

export default withRouter(SubmissionType);
