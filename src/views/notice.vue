<script setup>
import { Message, Calendar, Tools, Search } from "@element-plus/icons-vue";
</script>

<template>
  <el-container>
    <el-main>
      <h2>一、比赛宗旨</h2>
      <p>
        大赛以“<strong>生物+ 向未来</strong
        >”为主题，以“大胆创新，以赛促学”为指导思想，鼓励同学们激发创新潜能，践行“<strong>探索未知，激情求解</strong>”的院训，让“生物”新思路扬帆逐梦，让“生物”的想象与现实融合，为“生物”远航添入一份动力，为同学们向未来迈进提供平台。
      </p>
      <h2>二、参赛对象</h2>
      <p><strong>浙江工业大学2022级本科生</strong></p>
      <h2>三、比赛时间</h2>
      <p><strong>2022年11月6日至2022年12月9日</strong></p>
      <h2>四、比赛规则</h2>
      <ol class="rules">
        <li>
          学生自由组队围绕生物工程相关领域的任何问题，开展自主性创意设计、社会调查以及文献检索，形成<strong>论文作品</strong>，并设计<strong>展示海报</strong>。
        </li>
        <li>
          学生参赛的作品范围包括“生活中的生物工程应用”、“生物工程与人类健康”、“生物工程与能源资源”等方向，内容涵盖实验研究、工程设计、创意设计等方面。要求作品<strong>思路清晰</strong>、<strong>创意新颖</strong>、<strong>论文格式规范</strong>。
        </li>
        <li>
          每个作品参加人数<strong>不超过 4 人</strong
          >，其中包括<strong>负责人1人</strong>（负责人须为生物工程学院学生）。每位学生<strong>限报一个</strong>参赛作品，<strong
            >报名时间为 11月6日至11月20日晚20:00</strong
          >。
        </li>
      </ol>
      <h2>五、赛程安排</h2>
      <p>
        见<el-link href="timeline" type="primary" :icon="Calendar"
          >比赛日程</el-link
        >
      </p>
      <h2>六、项目申报</h2>
      <p>
        请参赛者填写《生物工程学院生物创新设计大赛申请表》、《生物工程学院生物创新设计大赛汇总表》，并附上设计方案于
        <strong>11 月 20日晚20:00前（暂定）</strong>将电子稿发至
        <el-link
          href="mailto:zjut_cbb_kcb@126.com"
          type="primary"
          :icon="Message"
          >zjut_cbb_kcb@126.com</el-link
        >。
      </p>
      <p>
        邮件主题为“生物创新设计大赛”，附件为命名成“负责学生姓名+作品名称”的压缩包，其中包含申请表、汇总表、项目设计论文及展示海报，且分别以“申请表
        负责人姓名 负责人学号”、“汇总表 负责人姓名 负责人学号”、“论文 负责人姓名
        项目名称”及“海报 负责人姓名 项目名称”的格式命名。
      </p>
      <p>
        项目设计论文的文件格式为<el-link
          href="https://smallpdf.com/cn/word-to-pdf"
          :icon="Tools"
          type="primary"
          target="_bank"
          ><strong>PDF</strong></el-link
        >版，展示海报的宽长比为<strong>5:7</strong>，分辨率不低于<strong>1000*1400</strong>（宽*长），要求为<strong
          >300<el-link
            href="https://baike.baidu.com/item/DPI/908073"
            :icon="Search"
            type="primary"
            target="_bank"
            ><strong>DPI</strong></el-link
          ></strong
        >，格式可为<strong>PNG或JPG</strong>等。
      </p>
      <h2>七、评审设置</h2>
      <ol class="rules">
        <li>评审规则包括项目的创新性、可行性、论文格式规范、答辩表现等。</li>
        <li>
          海报独立于论文及答辩，与项目简介一同以线上网络投票的方式，进行人气值排序。
        </li>
        <li>
          除海报外，大赛采用评委会评分制，由学院教师对各个项目进行综合打分，最终确定获奖名单。
        </li>
      </ol>
      <h2>八、奖项设置</h2>
      <p>
        按作品申报数量进行奖项数量的设置。<strong>一等奖≦10%</strong>，<strong>二等奖≦20%</strong>，<strong>三等奖≦30%</strong>，以及<strong>最佳人气海报奖≦15%</strong>（在线上投票展示，由学生自主投票产生）。一等奖与二等奖由现场答辩产生，所有获奖同学将于决赛答辩现场，由生物工程学院教师颁发荣誉证书。
      </p>
    </el-main>
  </el-container>
</template>

<style lang="scss" scoped>
.rules {
  li {
    margin: 10px 0;
  }
}
strong {
  color: var(--el-color-primary-light-3);
}
</style>
