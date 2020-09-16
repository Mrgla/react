import React, { Component } from 'react'
import './home.less'

import {
  Icon,
  Card,
  Statistic,
  DatePicker,
  Timeline,
  Spin
} from 'antd'

import moment from 'moment'

import Line from './Line'
import Bar from './Bar'


const { RangePicker } = DatePicker
const dateFormat = 'YYYY/MM/DD'



export class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isVisited: true,
      refreshBar: 0,
      onlineRefresh: false
    }
    this.barRef = React.createRef()
  }

  handleChange = (isShow) => {
    this.setState({
      isVisited: isShow
    })
    this.barRef.current.getBarData(1)
  }

  refresh = () => {
    console.log('refresh')
    this.barRef.current.getBarData(2)
  }


  render() {
    const { isVisited } = this.state
    return (
      <div className="home">
        <div className='top_card'>
          <Card
            className="home-card"
            title="商品总量"
            extra={<Icon style={{ color: 'rgba(0,0,0,.45)' }} type="question-circle" />}
            style={{ width: 250 }}
            headStyle={{ color: 'rgba(0,0,0,.45)' }}
          >
            <Statistic
              value={1234567}
              suffix="个"
              style={{ fontWeight: 'bolder' }}
            />
            <Statistic
              value={15}
              valueStyle={{ fontSize: 15 }}
              prefix={'周同比'}
              suffix={<div>%<Icon style={{ color: 'red', marginLeft: 10 }} type="arrow-down" /></div>}
            />
            <Statistic
              value={10}
              valueStyle={{ fontSize: 15 }}
              prefix={'日同比'}
              suffix={<div>%<Icon style={{ color: '#3f8600', marginLeft: 10 }} type="arrow-up" /></div>}
            />
          </Card>
          <Line />
        </div>

        <Card
          className="home-content"
          title={<div className="home-menu">
            <span className={isVisited ? "home-menu-active home-menu-visited" : 'home-menu-visited'}
              onClick={() => this.handleChange(true)}>访问量</span>
            <span className={isVisited ? "" : 'home-menu-active'} onClick={() => this.handleChange(false)}>销售量</span>
          </div>}
          extra={<RangePicker
            defaultValue={[moment('2019/01/01', dateFormat), moment('2019/06/01', dateFormat)]}
            format={dateFormat}
          />}
        >
          <Card
            className="home-table-left"
            title={isVisited ? '访问趋势' : '销售趋势'}
            bodyStyle={{ padding: 0 }}
            extra={<Icon type="reload" onClick={() => this.refresh()} />}
          >
            <Bar ref={this.barRef}/>
          </Card>

          <Card title='任务' className="home-table-right">
            <Timeline>
              <Timeline.Item color="green">新版本迭代会</Timeline.Item>
              <Timeline.Item color="green">完成网站设计初版</Timeline.Item>
              <Timeline.Item color="red">
                <p>联调接口</p>
                <p>功能验收</p>
              </Timeline.Item>
              <Timeline.Item>
                <p>登录功能设计</p>
                <p>权限验证</p>
                <p>页面排版</p>
              </Timeline.Item>
            </Timeline>
          </Card>
        </Card>
      </div>
    )
  }
}

export default Home
