<template>
  <div>
    <el-dialog v-model="displayDialog" title="Shipping address">
      <el-form :model="form">
        <el-form-item label="Promotion name" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="Zones" :label-width="formLabelWidth">
          <el-select v-model="form.region" placeholder="Please select a zone">
            <el-option label="Zone No.1" value="shanghai"></el-option>
            <el-option label="Zone No.2" value="beijing"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <template #slot:footer>
        <span class="dialog-footer">
          <el-button @click="dialogFormVisible = false">Cancel</el-button>
          <el-button type="primary" @click="dialogFormVisible = false">Confirm</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import { onMounted, ref } from "vue";
export default {
  props: {
    createIssueDialog: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    const displayDialog = ref(false);

    onMounted(() => {
      displayDialog.value = props.dialogFormVisible;
    });

    return {
      displayDialog,
    };
  },
};
</script>

<style lang="sass" scoped></style>
