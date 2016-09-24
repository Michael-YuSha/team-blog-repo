import React, { Component } from 'react'
import { ARTICLES_API } from '../../constant'
import CommentItem from '../CommentItem'
import { timeHandle } from '../../minix'
import Loading from '../Loading'

var css = require('./style.styl')

export default class Comments extends Component {
	componentDidMount() {
		const { fetchComment } = this.props.actions
		const { id } = this.props
		fetchComment(`${ARTICLES_API}/${id}/comments`)
	}
	render() {
		const {data} = this.props.comments
		if(!data){
			return (<Loading />)
		}
		else if(data.length == 0){
			return (<div className="no-comment">本篇文章暂时没有评论</div>)
		}
		return(
			<div className='comment'>
			{
				data.map((item,index) => {
					return(
						<CommentItem key={index} avatarUrl={item.user.avatar_url}
							username={item.user.login}
							time={timeHandle(item.updated_at)}
							text={item.body}
						/>
					)
				})
			}
			</div>
		)

	}
}