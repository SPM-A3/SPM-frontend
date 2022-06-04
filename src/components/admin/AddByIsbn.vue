<template>
  <a-card :body-style="{padding: '24px 32px'}" :bordered="false" title="Add book">
    <a-form v-if="getBook">
        <a-form-item
          label="cover"
          :labelCol="{span: 7}"
          :wrapperCol="{span: 10}"
        >
          <a-upload
            name="avatar"
            list-type="picture-card"
            class="avatar-uploader"
            :show-upload-list="false"
            :customRequest="upload"
          >
            <img v-if="newBookInfo.cover" :src="newBookInfo.cover" alt="avatar" />
            <div v-else>
            <a-icon :type="loading ? 'loading' : 'plus'" />
            <div class="ant-upload-text">
                UPLOAD COVER
            </div>
            </div>
          </a-upload>
        </a-form-item>
      <a-form-item
        :label="bookName"
        :labelCol="{span: 7}"
        :wrapperCol="{span: 10}"
        
      >
        <a-input :placeholder="bookNameInput" v-model="newBookInfo.book_name"/>
      </a-form-item>
      <a-form-item
        :label="author"
        :labelCol="{span: 7}"
        :wrapperCol="{span: 10}"
        
      >
        <a-input :placeholder="authorInput" v-model="newBookInfo.author"/>
      </a-form-item>
      <a-form-item
        :label="publisher"
        :labelCol="{span: 7}"
        :wrapperCol="{span: 10}"
        
      >
        <a-input :placeholder="publisherInput" v-model="newBookInfo.publisher"/>
      </a-form-item>
      <a-form-item
        :label="ISBN"
        :labelCol="{span: 7}"
        :wrapperCol="{span: 10}"
        
      >
        <a-input :placeholder="ISBNInput" v-model="newBookInfo.ISBN"/>
      </a-form-item>
      <a-form-item
        :label="publishedTime"
        :labelCol="{span: 7}"
        :wrapperCol="{span: 10}"
      >
        <a-month-picker
            :placeholder="publishedTimeInput"
            style="width: 100%"
            v-model="newBookInfo.published_time"
        />
      </a-form-item>
      <a-form-item
        :label="category"
        :labelCol="{span: 7}"
        :wrapperCol="{span: 10}"
        
      >
         <a-cascader
            :options="options"
            :placeholder="categoryInput"
            :show-search="{ filter }"
            v-model="newBookInfo.category"
        />
      </a-form-item>
      <a-form-item
        :label="briefIntroduction"
        :labelCol="{span: 7}"
        :wrapperCol="{span: 10}"
      >
        <a-textarea rows="4" :placeholder="briefIntroductionInput" v-model="newBookInfo.brief_introduction"/>
      </a-form-item>
      <a-form-item style="margin-top: 24px" :wrapperCol="{span: 10, offset: 7}">
        <a-button @click="submit" type="primary">Add</a-button>
        <a-button @click="cancel">CANCEL</a-button>
      </a-form-item>
    </a-form>
    <a-form v-else>
        <a-form-item
          label="language"
          :labelCol="{span: 7}"
          :wrapperCol="{span: 10}"
        >
          <a-select default-value="zh" @change="handleChangeLanguage">
            <a-select-option value="en">
              English
            </a-select-option>
            <a-select-option value="zh">
              中文
            </a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item
            label="ISBN"
            :labelCol="{span: 7}"
            :wrapperCol="{span: 10}"
        >
        <a-input :placeholder="ISBNInput" v-model="newBookInfo.ISBN" @keyup.enter="search"/>
      </a-form-item>
      <a-form-item 
          :wrapperCol="{span: 10, offset: 7}"
      >
          <a-button @click="search" type="primary" :loading="searching">
            GET BOOK INFO
          </a-button>
      </a-form-item>
    </a-form>
  </a-card>
</template>

<script>
import { getAccessToken } from '../../services/user';
import category from './category'
import moment from 'moment'

function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}
export default {
    name: "AddByIsbn",
    data() {
        return {
            getBook: false,
            searching: false,
            loading: false,
            bookName: "Book name",
            bookNameInput: "Please input book name",
            author: "Author",
            authorInput: "Please input author",
            publisher: "Publisher",
            publisherInput: "Please input publisher",
            ISBN: "ISBN",
            ISBNInput: "Please input ISBN",
            category: "Category",
            categoryInput: "Please enter or select category",
            publishedTime: "Publish date",
            publishedTimeInput: "Please select publish date",
            briefIntroduction: "Introduction",
            briefIntroductionInput: "Please input introduction",
            newBookInfo: {
                book_name: undefined,
                author: undefined,
                publisher: undefined,
                ISBN: undefined,
                category: undefined,
                published_time: undefined,
                cover: undefined,
                brief_introduction: undefined,
            },
            options: [],
            language: "zh",
        }
    },
    async created(){
      this.options = await category.getOptions();
      console.log(moment().format())
    },
    methods: {
      handleUpdate(info) {
        if (info.file.status === 'uploading') {
          this.loading = true;
          return;
        }
        if (info.file.status === 'done') {
          // Get this url from response in real world.
          getBase64(info.file.originFileObj, imageUrl => {
            this.newBookInfo.cover = imageUrl;
            this.loading = false;
          });
        }
      },
      upload(option) {
        let that = this;
        this.loading = true;
        const reader = new FileReader();
        reader.readAsDataURL(option.file);
        reader.onloadend = function(e) {
          let base64 = e.target.result.toString().split(',')[1];
          if (e && e.target && e.target.result) {
            var raw = base64;
            var requestOptions = {
              method: 'POST',
              body: raw,
            };

            fetch("https://service-rb270dgm-1301774019.gz.apigw.tencentcs.com/release/SPM_uploadimage", requestOptions)
              .then(response => response.text())
              .then(result => {
                this.loading = false;
                that.newBookInfo.cover = result;
                console.log(result);
              })
              .catch(error => {console.log('error', error);that.loading = false});
          }
        };
      },
      submit(){
        let newBookInfoSubmit = { ... this.newBookInfo };
        // 处理时间为2020-02
        newBookInfoSubmit.category  = this.newBookInfo.category[1];
        newBookInfoSubmit.published_time = newBookInfoSubmit.published_time.format("YYYY-MM")+"-01";
        console.log(newBookInfoSubmit);
        // 提交
        var myHeaders = new Headers();
        myHeaders.append("token", getAccessToken());
        myHeaders.append("Content-Type", "application/json");
        var body = newBookInfoSubmit;
        var requestOptions = {
          method: 'POST',
          headers: myHeaders,
          body: JSON.stringify(body),
        };

        let that = this;
        fetch(`${this.$global.BASE_URL}/api/admin/book/add`, requestOptions)
          .then(response => response.json())
          .then(result => {
            if(result.code === 0 || result.code === "0"){
              that.$message.success('Add book successfully')
              that.refresh();
            }else{
              that.$message.error("Failed to add the book.");
            }
          })
          .catch(error => {
            that.$message.error("API call failed.")
          });
      },
      filter(inputValue, path) {
        return path.some(
          (option) =>
            option.label.toLowerCase().indexOf(inputValue.toLowerCase()) > -1
        );
      },
      async search(){
          if(this.language === "zh"){
            console.log(this.language);
            this.cnSearch();
            return;
          }
          this.searching = true;
          const isbn = this.newBookInfo.ISBN;
          let bookInfo = {};
          let that = this;
          await fetch(`https://openlibrary.org/api/books?bibkeys=ISBN:${isbn}&jscmd=details&format=json`)
            .then((response) => response.json())
            .then(result => {
                if(JSON.stringify(result) === '{}' ){
                    that.$message.error("ISBN not found, please enter another.");
                    that.searching = false;
                    that.newBookInfo.ISBN = undefined;
                }else{
                    bookInfo = result[`ISBN:${isbn}`].details
                }
            })
          this.newBookInfo.book_name = bookInfo.title;
          if(bookInfo.publishers) this.newBookInfo.publisher = bookInfo.publishers[0];
          if(bookInfo.covers) this.newBookInfo.cover = `https://covers.openlibrary.org/b/id/${bookInfo.covers[0]}.jpg`;
          if(bookInfo.authors){
            this.newBookInfo.author = (bookInfo.authors[0]).name;
          }else{
            await fetch(`https://openlibrary.org/api/get?key=/authors/${(bookInfo.works[0].key.split('/'))[2].slice(0,-1)}A`)
              .then(res => res.json())
              .then(result => {
                if(result.status == "fail"){
                  console.log("fail")
                }else{
                  that.newBookInfo.author = result.result.name;
                }
              })
              .catch(err => {
                
              })
          }
          if(bookInfo.publish_date) this.newBookInfo.published_time = moment(bookInfo.publish_date, "MMMM DD, YYYY");
          fetch(`https://openlibrary.org/api/get?key=${bookInfo.works[0].key}`)
              .then(res => res.json())
              .then(result => {
                if(result.result.description)that.newBookInfo.brief_introduction = result.result.description.slice(0,200)+'...';
                else that.newBookInfo.brief_introduction = that.newBookInfo.book_name;
              })
          that.newBookInfo.category = ["I", "I1"]
          this.$message.success("Got the book.");
          this.searching = false;
          this.getBook = true;
      },
      cnSearch(){
        this.searching = true;
        const isbn = this.newBookInfo.ISBN;
        let that = this;
        fetch(`https://api.jike.xyz/situ/book/isbn/${isbn}?apikey=12524.6833bc5d3ba860a9242c196b4feaae26.8da93d6d3ac6f6bc9f2ab633b26cc791`)
          .then(res => res.json())
          .then(result => {
            const {data, ret, msg} = result;
            that.searching = false;
            if(ret === 1){
              that.$message.error("ISBN not found!");
            }else{
              that.$message.success("Got the book.")
              that.newBookInfo.cover = data.photoUrl;
              that.newBookInfo.book_name = data.name;
              that.newBookInfo.author = data.author;
              that.newBookInfo.publisher = data.publishing;
              // that.newBookInfo.ISBN = data.code;
              // that.newBookInfo.category
              that.newBookInfo.published_time = moment(data.published);
              that.newBookInfo.brief_introduction = data.description.slice(0,200);
              this.getBook = true;
            }
          })
      },
      handleChangeLanguage(value){
        this.language = value;
      },
      refresh(){
        this.getBook = false;
        this.newBookInfo = {
          book_name: undefined,
          author: undefined,
          publisher: undefined,
          ISBN: undefined,
          category: undefined,
          published_time: undefined,
          cover: undefined,
          brief_introduction: undefined,
        }
        this.searching = false;
      },
      cancel(){
      this.refresh()
    }
    },
}
</script>

<style>
.avatar-uploader > .ant-upload {
  width: 160px;
  height: 220px;
}
.ant-upload-select-picture-card i {
  font-size: 32px;
  color: #999;
}

.ant-upload-select-picture-card .ant-upload-text {
  margin-top: 8px;
  color: #666;
}
img {
  height: 220px;
}
</style>