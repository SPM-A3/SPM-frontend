<template>
  <div class="result">
    <div >
      <a-icon class="success" type="check-circle" />
    </div>
    <div class="title">Successful payment</div>
		<div>
			<a-descriptions title="Payment Information" :column="1" style="margin-top: 50px; width: 400px">
				<a-descriptions-item label="ISBN">{{$route.query.ISBN}}</a-descriptions-item>
				<a-descriptions-item label="book_id">{{$route.query.book_id}}</a-descriptions-item>
				<a-descriptions-item label="Out trade number">{{$route.query.out_trade_no}}</a-descriptions-item>
				<a-descriptions-item label="Trade number">{{$route.query.trade_no}}</a-descriptions-item>
				<a-descriptions-item label="Total amount">{{$route.query.total_amount}}$</a-descriptions-item>
				<a-descriptions-item label="Time">{{time}}</a-descriptions-item>
			</a-descriptions>
		</div>
  </div>
</template>

<script>
import moment from 'moment'
export default {
  name: 'Result',
	data(){
		return {
			time: null,
		}
	},
  created() {
    this.time = moment(this.$route.query.timestamp).format("MMMM Do YYYY, h:mm:ss a");
  }
}
</script>

<style lang="less" scoped>
  .result{
    // text-align: center;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
    width: 100%;
    margin: 0 auto;
    .icon{
      font-size: 72px;
      line-height: 72px;
      margin-bottom: 24px;
    }
    .success {
      font-size: 72px;
			color: #72c140;
    }
    .title{
      font-size: 50px;
      // color: @title-color;
      font-weight: 700;
      line-height: 50px;
      margin-bottom: 16px;
    }
    .desc{
      font-size: 14px;
      line-height: 22px;
      margin-bottom: 24px;
    }
    .content{
      // background-color: @background-color-light;
      padding: 24px 40px;
      border-radius: 2px;
      text-align: left;
    }
    .action{
      margin-top: 32px;
    }
  }

</style>
