<template>
    <a-card>
      <a-tabs default-active-key="1">
      <a-tab-pane key="1" tab="Add fist level category">
        <a-form>
            <a-space  direction="vertical">
              <a-form-item label="Original options:">
                <a-cascader
                  :options="originalOptions"
                  placeholder="Check the riginal options"
                />
              </a-form-item>
              <a-form-item label="New category value" extra="e.g. A">
                <a-input v-model="newFather.value" placeholder="Input the new category value, e.g. A"></a-input >
              </a-form-item>
                <a-form-item label="New category label" extra="e.g. 马克思主义、列宁主义、毛泽东思想、邓小平理论">
                <a-input v-model="newFather.label" placeholder="Input the new category label"></a-input>
                </a-form-item>
                <a-form-item>
                  <a-button :loading="loading" size="large" @click="onSubmitFather" type="primary">SUBMIT</a-button>
                </a-form-item>
            </a-space>
        </a-form>
      </a-tab-pane>
      <a-tab-pane key="2" tab="Add subcategory" force-render>
        <a-form>
          <a-space  direction="vertical">
            <a-form-item label="Father option:">
              <a-cascader
                v-model="newSon.father"
                :options="options"
                placeholder="Select father options"
              />
            </a-form-item>
            <a-form-item label="New subcategory number" extra="e.g. 1">
              <a-input v-model="newSon.value" placeholder="Input the new category value, e.g. A"></a-input >
            </a-form-item>
              <a-form-item label="New subcategory value" extra="e.g. 马克思、恩格斯著作">
              <a-input v-model="newSon.label" placeholder="Input the new category label"></a-input>
              </a-form-item>
              <a-form-item>
                <a-button :loading="loading" size="large" @click="onSubmitSon" type="primary">SUBMIT</a-button>
              </a-form-item>
          </a-space>
        </a-form>
      </a-tab-pane>
      </a-tabs>
      <a-button @click="resetCategory" type="danger" :loading="loadingReset">
        RESET CATEGORY
      </a-button>
    </a-card>
</template>

<script>
import category from './category'

export default {
    name: "AddByIsbn",
    data() {
        return {
            newFirstLevel: [],
            originalOptions: [],
            options: [],
            newFather: {
                value: null,
                label: null,
            },
            newSon: {
                father: undefined,
                value: null,
                label: null,
            },
            loading: false,
            loadingReset: false
        }
    },
    async created(){
      const options = await await category.getOptions();
      this.originalOptions = options;
      for(let i of options){
          this.options.push({
              value: i.value,
              label: i.label
          })
      }
    },
    methods: {
      onSubmitFather() {
        this.loading = true;
        this.originalOptions.push({
          value: this.newFather.value,
          label: this.newFather.value+this.newFather.label
        })
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
          "category": JSON.stringify(this.originalOptions)
        });

        var requestOptions = {
          method: 'POST',
          headers: myHeaders,
          body: raw,
          redirect: 'follow'
        };
        const that = this;
        fetch("https://testip-cloud-homework-lralemfqco.cn-hangzhou.fcapp.run/editgory", requestOptions)
        .then(response => response.text())
        .then(result => {that.$message.success("Add category successfully.");that.loading = false})
        .catch(error => {
          console.log('error', error);
          that.loading = false;
          that.$message.error("Failed to add the category.");
        });
      },
      onSubmitSon() {
        console.log(this.newSon.father);
        const father = this.newSon.father;
        const newSon = {
          value: father[0]+this.newSon.value,
          label: father[0]+this.newSon.value+this.newSon.label
        }
        for(let i = 0; i < this.originalOptions.length; i++){
          if(this.originalOptions[i].value === father[0]){
            this.originalOptions[i].children.push(newSon)
            break;
          }
        }
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
          "category": JSON.stringify(this.originalOptions)
        });

        var requestOptions = {
          method: 'POST',
          headers: myHeaders,
          body: raw,
          redirect: 'follow'
        };
        const that = this;
        fetch("https://testip-cloud-homework-lralemfqco.cn-hangzhou.fcapp.run/editgory", requestOptions)
        .then(response => response.text())
        .then(result => {that.$message.success("Add category successfully.");that.loading = false})
        .catch(error => {
          console.log('error', error);
          that.loading = false;
          that.$message.error("Failed to add the category.");
        });
      },
      async resetCategory() {
        this.loadingReset = true;
        await category.resetOptions();
        this.loadingReset = false;
        this.$message.success("Reset options successfully.");
      },
      clear(){
        this.newFather =  {
                value: null,
                label: null,
            }
        this.newSon = {
                father: undefined,
                value: null,
                label: null,
            }
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