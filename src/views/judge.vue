<script setup>
import { isLogin, getTeamList, judgeProject } from "../api";
import { useRouter } from "vue-router";
import { useUserStore } from "../store";
import { transHtml } from "../utils";
import { computed, reactive } from "vue";
import pdfViewer from "../components/pdf-viewer/index.vue";
import editor from "../components/editor/index.vue";
import { ElMessage } from "element-plus";

const teamList = ref([
  {
    id: "55",
    leader: "202005070112",
    title: null,
    abstract: null,
    new: null,
    year: "2022",
    paper: "b82fd89b38d009beec5c72a12ca57db3",
    score: null,
    advice: null,
  },
  {
    id: "56",
    leader: "202205070426",
    title: "&lt;p&gt;绿色动物&lt;/p&gt;",
    abstract:
      "&lt;p&gt;&lt;strong&gt;项目分为三部分，1：对动物细胞中导入叶绿体的前景的描述。&lt;/strong&gt;&lt;/p&gt;&lt;p&gt;&lt;/p&gt;&lt;p&gt;&lt;strong&gt;在该部分中，项目分析了当前在航空航天，畜牧业，以及环境保护方面存在的问题，并阐述了本项目将对上述问题起到的改进作用。2：对项目可行性的探讨。在该部分，项目针对叶绿体移植入动物细胞时可能存在的问题进行了归纳，并构思了可能的解决办法。其中包括对现存已知的与藻类共生的动物———斑点钝口螈的关注，细胞本身对细胞内异己物质的免疫作用，适宜的改造对象等因素的探讨。3：对导入方式的选择。项目总结归纳了当今对细胞的各种编辑技术，如细胞融合，核移植，微注射等，并结合本项目的最终目的对方法进行了选择。鉴于实验条件有限等客观因素，本项目着重于设想，探讨理论上的可行性，旨在提出一个未来可供研究的发展方向。&lt;/strong&gt;&lt;/p&gt;",
    new: "&lt;p&gt;&lt;strong&gt;众所周知，长时间的太空作业对食品与氧气有着极大的需求，当下的解决方案主要是从地球补给食物、水，以及电解水制氧气。太空食品需从地球携带到太空，而载人飞船发射费用昂贵。而水的运输更为不便，当前主要依靠水的循环利用，若在宇航员表皮细胞中转入叶绿体，便可以利用太空中充足的光能资源，一定程度上缓解太空食物，氧气的缺乏。同样的，该技术还可用于地球上相似的环境，转入叶绿体可以提高人类对如高寒缺氧的高原等环境的适应能力，并以此提高军事边防实力乃至未来的太空移民可行度的提高。于牲畜表皮细胞中转入叶绿体，可以降低喂养成本，提高产出，提高畜牧业整体生产效益。&lt;/strong&gt;&lt;/p&gt;&lt;p&gt;&lt;strong&gt;动物也进行光合作用，可以有效改善空气质量，缓解现代化过快带来的大气污染。&lt;/strong&gt;&lt;/p&gt;&lt;p&gt;&lt;strong&gt;同时，转入叶绿体的生物具有一定观赏性，可以起到美化环境作用。&lt;/strong&gt;&lt;/p&gt;",
    year: "2022",
    paper: "0fc83faa59afb2ac06197818f4e5bc70",
    score: 0,
    advice: null,
  },
  {
    id: "60",
    leader: "202205070228",
    title: "&lt;p&gt;&lt;br&gt;消失吧，微塑料&lt;/p&gt;",
    abstract:
      "&lt;p&gt;    微塑料的粒径范围从几微米到几毫米，是形状多样的非均匀塑料颗粒混合体，由于微塑料体积小，传播范围广（主要在水体内传 播），若不采取治理和控制手段，会在水体中不断积累，形成新的环境污染问题。其中通过生物降解微塑料逐渐成为热点且主要集中在生物酶降解方面，期望能找到一种安全、高效、环保的措施来解决微塑料污染。同时，聚对苯二甲酸乙二醇酯（PET）占全球固体废物的 12%，是构成微塑料的主要成分。理论上，PET 的循环碳经济可以通过快速酶解聚合，然后再聚 合或转化/转化为其他产品来实现。&lt;/p&gt;&lt;p&gt;    我们采用构建两株分别表达PETase和MHETase酶的重组大肠杆菌，以及利用机器人学习模型（MutCompute）诱导产生的天然酶突变体FAST-PETase（功能性、活性、稳定和耐受性PETase），实现在常规条件下快速反应。通过酶反应温度、酶反应时间等的优化发现，PETase酶和MHETase酶反应的最适温度为 30 °C ，两种酶在 3：1 混合时可以 达到对 PET 的最高分解效率。而 FAST-PETase酶在某些情况下，在24小时内完全可以将PET塑料分解为单体，且实现食品级塑料回收及回收闭环的挑战。&lt;/p&gt;",
    new: "&lt;p&gt;    PET水解酶的应用受到了限制，因为其对pH和温度范围的狭窄、反应速度慢，所以无法被直接用于降解PET。我们通过全基因合成分别获得了细菌Ideonella sakaiensis201-F6中MHETase酶的编码基因，以及突变后的PETase酶的编码基因，构建了重组基因工程菌E.coli BL21- pET29a-MHETase和E.coli BL21-pET29a-PETase，通过优化诱导时间、诱导温度等因素建立较优的产酶条件。以及利用机器人学习模型（MutCompute）诱导产生的天然酶突变体 FAST-PETase（功能性、活性、稳定和耐受性PETase），实现在常规条件下快速反应。FAST PETase可以潜在地用于快速高效降解嵌入织物中的PET碎片，为从商业聚酯产品中回收PET单体和减少微纤维向环境中的浸出提供了一条潜在途径。&lt;/p&gt;",
    year: "2022",
    paper: "cd8433509fadc49a65abf06a40c8597b",
    score: null,
    advice: null,
  },
  {
    id: "61",
    leader: "202205070322",
    title: "&lt;p&gt;利用 mRNA 技术对癌症疫苗的研究&lt;/p&gt;",
    abstract:
      "&lt;p&gt;随着新冠信使RNA（messengerRNA，mRNA）疫苗问世，mRNA疫苗这一技术在科学界、医药界、以及社会层面受到了广泛的关注。mRNA疫苗不仅在预防和治疗传染病方面有重大意义，也对癌症方面引起了关注。21世纪之初新型冠状病毒肺炎（COVID-19）疫情的突然爆发，极大地推动了mRNA技术在严重急性呼吸综合征冠状病毒2（SARS-CoV-2）疫苗研发领域的应用。癌症的治疗是全世界人们都在关注的一个问题，利用mRNA技术研究肿瘤疫苗，给治疗癌症提供了一种方法。mRNA是一种新的药物模式可利用机体自身的翻译系统表达不同功能的蛋白，从而用于多种疾病的治疗，被认为是可代替DNA和重组蛋白介导的疗法。癌症mRNA疫苗是继手术，化疗&amp;nbsp;，放疗以及细胞免疫治疗后的一种治疗癌症的方法，有着不错的前景。随着mRNA的技术改善和发展，mRNA的稳定性、翻译效率大幅提升，免疫原性逐渐可控，mRNA的短处正在不断的减少。而mRNA疫苗有着生产周期短，生产成本低，能够实现大规模生产的优势，这些优势是mRNA疫苗的潜力。但目前mRNA疫苗还面临着一些巨大的挑战，需要我们去研究寻找解决的办法。&lt;/p&gt;",
    new: "&lt;p&gt;&lt;strong&gt;该项目通过研究利用mRNA制造新冠疫苗的方法，进行深入了解，并推测出目前还未出现的癌症mRNA疫苗的生产方法。&lt;/strong&gt;&lt;/p&gt;",
    year: "2022",
    paper: "40ace6de498488422e957374218e6ef2",
    score: null,
    advice: null,
  },
  {
    id: "70",
    leader: "202205070231",
    title:
      "&lt;p&gt;&lt;strong&gt;芳心救火员——银杏双黄酮提取工艺优化的思考&lt;/strong&gt;&lt;/p&gt;",
    abstract:
      "&lt;p&gt;目的： &amp;nbsp;银杏是世界上最古老的树种之一，被誉为“活化石”，银杏叶是一种重要的药用、保健食品原料，它的提取物银杏双黄酮（Ginkgetin）具有扩张血管改善细胞血液循环的功效，对预防和治疗心脑血管疾病有显著效果。目前，银杏双黄酮提取普遍使用甲醇、丙酮、乙醇等有机溶剂作为提取剂釆用溶剂萃取的方法制备银杏叶提取物，工艺复杂，成本高，易造成残留影响产品的质量且残留物中具有一定毒性。为降低生产成本，达到绿色、安全，我们小组对银杏双黄酮的提取环节进行优化，选用水作为提取剂，优选水浸法提取的最佳条件（最佳提取工艺）。&lt;/p&gt;&lt;p&gt;方法：采用正交实验以及高效液相色谱法，以银杏总黄酮醇苷为指标，对水浸法提取银杏总黄酮的浸提温度、浸提时间、提取次数和料液比进行了优化优选。&lt;/p&gt;&lt;p&gt;结果：最佳提取工艺为：100℃条件下水浸法提取３次，每次1h，料液比为1：26。&lt;/p&gt;&lt;p&gt;结论：水浸法提取工艺简单而稳定，生产成本较低适用于大规模生产，极大限度的发挥银杏叶提取物的药用价值。&lt;/p&gt;",
    new: "&lt;p&gt;为在保证产品质量的条件下解决生产成本过高的问题，本小组对生产溶剂进行创新，以水作为提取溶剂，选用水浸法提取银杏双黄酮，实现简化提取工艺,降低生产成本，达到节能、省时、方便的目的。&lt;/p&gt;",
    year: "2022",
    paper: "d989c0e44fcd25f87adae81751d526df",
    score: null,
    advice: null,
  },
  {
    id: "71",
    leader: "202205070233",
    title:
      "&lt;p&gt;&lt;strong&gt;关于通过抑制血管紧张素Ⅱ促进血管新生过程进而治疗高血压等心血管疾病的研究&lt;/strong&gt;&lt;/p&gt;",
    abstract:
      "&lt;p&gt;&lt;strong&gt;高血压是目前世界上最为常见的慢性病，也是引起心脑血管疾病的主要因素。是一种严重的疾患，会显著加剧患心脏、大脑、肾脏疾病以及其他疾病的风险。与此同时，我国也是高血压疾病高发国家，基于这些事实，我们萌生了研究高血压治疗新方案的想法。敲除CD38基因可以改善血管重塑引起的高血压，具体原理如下：CD38基因表达产物CD38的缺失可以：1.激活细胞的SIRT3-FOXO3信号通路;2.抑制Ca2+-calcineunin-NFATc4通路从而抑制血管紧张素II（AngII）的表达。AngII能通过活化STAT3增加miR-21的表达，从而下调miR-21靶基因 PTEN 的表达水平，增强 HMEC的增殖能力，最终引发血管重塑。于是抑制AngII的表达即可抑制血管重塑现象。通过miR-21在血管紧张素II促进血管新生中的作用和机制实验和内皮细胞特异性敲除CD38基因在AngII诱导的小鼠高血压及血管新生中的作用及其机制实验论证了该思路的可行性。本研究为未来的高血压等心血管疾病治疗方法研究提供了一种全新的思路。本研究创新地将视角放在现代治疗手段上，即使用生物技术对基因进行改变，从而达到减少CD-38的表达，减轻血管重塑造成的影响，以此从根本上来治疗高血压疾病。同时本实验的思想也为其他心血管疾病的治疗，甚至是在任何由基因影响而引发的疾病的治疗过程中提供全新的治疗思路。&lt;/strong&gt;&lt;/p&gt;",
    new: "&lt;p&gt;&lt;strong&gt;敲除CD38基因可以改善血管重塑引起的高血压，具体原理如下： CD38基因表达产物CD38的缺失可以：1.激活细胞的SIRT3-FOXO3信号通路;2.抑制Ca2+-calcineunin-NFATc4通路从而抑制血管紧张素II（AngII）的表达。昂二.能通过活化STAT3增加miR-21的表达，从而下调miR-21靶基因 PTEN 的表达水平，增强 HMEC 的增殖能力，最终引发血管重塑。于是抑制AngII的表达即可抑制血管重塑现象。本研究为未来的高血压等心血管疾病治疗方法研究提供了一种全新的思路。不同于西医或是传统中医对于高血压疾病的药物治疗、调养身体等疗法，本研究创新地将视角放在现代治疗手段上，即使用生物技术对基因进行改变，从而达到减少CD-38的表达，减轻血管重塑造成的影响，以此从根本上来治疗高血压疾病。&lt;/strong&gt;&lt;/p&gt;",
    year: "2022",
    paper: "3914f6a7afe38afd5f101c2b501b0808",
    score: null,
    advice: null,
  },
  {
    id: "72",
    leader: "202205070320",
    title:
      "&lt;p&gt;&lt;strong&gt;丝状真菌产孢基因在益生菌中的运用&lt;/strong&gt;&lt;/p&gt;",
    abstract:
      "&lt;p&gt;&lt;strong&gt;有丝真菌的孢子繁殖，正是PTKl基因的存在作为其的产孢基因，同时其主要靠的是brlA，abaA和wetA 3个主要基因组的调控作用与一系列其他基因的辅助作用下共同调节形成。在这些知识的思路激发下，我们试图将这些基因引入同属于子囊菌纲下的布拉迪酵母菌（Saccharomyces cerevisiae boulardii ），尝试提高其产量同时能够利于其的储存，使其可以更好的保持活性，因为目前对于该益生菌的保存方法仍以灭活的方式来保存，我们希望能够通过以证实对子囊菌无性产孢有帮助的brlA基因来让其能够更好繁殖运输甚至可能可以让它拥有类似霉菌的性质。我们希望能通过CRISPR/Cas9系统来对此进行定向编辑并通过对比几个组所产生的不同效果来寻找出最贴近最适合的基因组。同时，对于培育后的酵母菌，我们采用ITS序列分析方法分析其在5.8S核糖体RNA基因及内部转录间隔区的变化，与genbank中OP600625.1号基因组序列进行比对来推测这一系列改动对其整个基因序列带来的影响。同时对其性质的改动进行推测，并且检测其在多次繁殖后基因的变化，在这之后对其多次子代进行相似操作，保证其基因稳定后可将该真菌用于实验阶段，检查其作为在儿童相关抗生素腹泻方便的作用与作为益生菌的作用，检查其肠道定植率，在全部检查均合格后可考虑进行量产。&lt;/strong&gt;&lt;/p&gt;&lt;p&gt;&lt;strong&gt;&amp;nbsp;&lt;/strong&gt;&lt;/p&gt;",
    new: "&lt;p&gt;&lt;strong&gt;我们项目是将霉菌与益生菌相结合，同是真菌但是却截然不同的两种东西，我们让它们碰撞出了火花。霉菌孢子繁殖的特性可以让益生菌快速的繁殖生长，同时我们认为也可以极大的增强其生存能力，同时也可以方便其的运输与保存，甚至可以不通过灭活而是保持活性的情况下进行运输与保存，大大减小其的运输成本并提高其在使用时的活性，所以我们查找论文找出了其中可能的基因序列进行实验。目前益生菌活性低，同时肠道定植率低无疑是一大问题，让益生菌获得一部分真菌的性质无疑可以提高其的定制率加强活性，同时大量用于动物草场饲料。同时本次我们使用的是同为子囊菌纲下的酵母菌，若基因编辑实验成功那么将意味着同样作为子囊菌的其它种类益生菌也可以通过类似手法进行基因编辑，将彻底解决目前市面上有关益生菌的相关问题。&lt;/strong&gt;&lt;/p&gt;&lt;p&gt;&lt;/p&gt;",
    year: "2022",
    paper: "238f007367c715a8b629c3738582a937",
    score: null,
    advice: null,
  },
  {
    id: "73",
    leader: "202205070402",
    title: "&lt;p&gt;餐厨垃圾回收及制备微生物饲料蛋白&lt;/p&gt;",
    abstract:
      "&lt;p&gt;我国餐厨垃圾数量十分巨大，并呈快速上升趋势。其实，营养丰富的餐厨垃圾是宝贵的可再生资源。我国餐厨垃圾具有高有机物含量(有机物含量约占干物质的80％以上)、高含水率(80％～90％)、高油、高盐分等特点。&lt;/p&gt;&lt;p&gt;笔者参考前人的设计方案为学校食堂设想了一项餐厨垃圾回收及制备微生物饲料蛋白的工程，利用餐厨垃圾灭菌除杂分离设备与复合微生物发酵菌种比例的筛选研究，采用微生物发酵技术，选择目前常用的自制复合菌剂(黑曲霉：啤酒酵母：枯草芽孢杆菌=1：1：1)与笔者目的菌剂（乳酸菌：酵母菌：枯草芽孢杆菌=2：2：3）和笔者设计的优化EM菌剂添加至餐厨垃圾中，比较产品中蛋白质的含量，以筛选出能快速处理餐厨垃圾的微生物菌群，为大规模处理餐厨垃圾提供依据。&lt;/p&gt;&lt;p&gt;本工程将餐厨垃圾固渣转化为微生物饲料蛋白这种高附加值的产品。其中的设计实验对自制复合菌剂、目的菌剂、优化EM菌剂利用餐厨垃圾发酵生产粗蛋白的发酵条件进行比较，对比三种菌剂转化蛋白质的效率，其中优化EM菌剂预计蛋白质转化率最高。实验结果为餐厨垃圾发酵生产微生物饲料蛋白提供一定的思路。&lt;/p&gt;",
    new: "&lt;p&gt;创造性优化了餐厨垃圾回收及制备微生物饲料蛋白这一工程，并设计改良了EM菌剂使其运用到工程中，蛋白转化效率明显提高。&lt;/p&gt;",
    year: "2022",
    paper: "e629ee2f833f9a8c8b76d245a338c6f9",
    score: null,
    advice: null,
  },
]);

const judgeForm = reactive({
  team: "",
  score: 0,
  advice: "",
});

const router = useRouter();
const currentTeam = ref({});
const canEdit = ref(false);

const tab = ref("projectInfo");

const editable = computed(() => {
  if (canEdit.value) {
    return true;
  }
  if (currentTeam.value.score !== null) {
    return false;
  } else {
    return true;
  }
});

function chooseTeam(team) {
  currentTeam.value = team;
  canEdit.value = false;
  judgeForm.team = team.id;
  judgeForm.score = team.score ?? 0;
  judgeForm.advice = transHtml(team.advice ?? "");
}

function getType(team) {
  return computed(() => {
    if (team.id === currentTeam.value.id) {
      return "primary";
    } else {
      return team.score !== null ? "success" : "default";
    }
  });
}

function submit() {
  judgeProject(judgeForm.team, judgeForm.score, judgeForm.advice, () => {
    ElMessage.success("评分成功");
    canEdit.value = true;
  });
}

onMounted(() => {
  isLogin(async () => {
    if (["judge", "admin"].includes(useUserStore().role)) {
      teamList.value = await getTeamList("judge");
      currentTeam.value = teamList.value[0];
      console.log(teamList.value);
    } else {
      router.push("/upload");
    }
  });
});
</script>

<template>
  <div>
    <el-container>
      <el-main>
        <el-row>
          <h2>项目列表</h2>
          <el-scrollbar>
            <div class="team-list gap-2">
              <template v-for="team of teamList" :key="team.id">
                <el-button
                  :type="getType(team).value"
                  @click="chooseTeam(team)"
                >
                  <span
                    v-html="
                      transHtml(team.title ?? team.id)
                        .replace('<br>', '')
                        .replace('<p></p>', '')
                    "
                  ></span>
                </el-button>
              </template>
            </div>
          </el-scrollbar>
        </el-row>
        <div>
          <el-tabs v-model="tab" stretch>
            <el-tab-pane
              style="height: 100%; width: 100%"
              label="项目信息"
              name="projectInfo"
            >
              <div class="project-info">
                <el-descriptions :column="1" direction="horizontal" border>
                  <el-descriptions-item label="项目标题">
                    <span
                      v-html="
                        transHtml(currentTeam.title ?? '无')
                          .replace('<br>', '')
                          .replace('<p></p>', '')
                      "
                    ></span>
                  </el-descriptions-item>
                  <el-descriptions-item label="项目简介">
                    <span
                      v-html="
                        transHtml(currentTeam.abstract ?? '无')
                          .replace('<br>', '')
                          .replace('<p></p>', '')
                      "
                    ></span>
                  </el-descriptions-item>
                  <el-descriptions-item label="创新之处">
                    <span
                      v-html="
                        transHtml(currentTeam.new ?? '无')
                          .replace('<br>', '')
                          .replace('<p></p>', '')
                      "
                    ></span>
                  </el-descriptions-item>
                </el-descriptions>
              </div>
            </el-tab-pane>
            <el-tab-pane
              style="height: 100%"
              label="项目论文"
              name="projectPaper"
            >
              <pdfViewer
                :file="`../../pdf/${currentTeam.id}/${currentTeam.paper}.pdf`"
                height="calc(100vh - 100px)"
              />
            </el-tab-pane>
            <el-tab-pane style="height: 100%" label="评分" name="projectScore">
              <el-form :model="judgeForm" :disabled="!editable">
                <el-form-item label="得分(100分)" required >
                  <el-input-number
                    v-model="judgeForm.score"
                    :min="0"
                    :max="100"
                  />
                </el-form-item>
                <el-form-item label="评语">
                  <editor
                    v-model:content="judgeForm.advice"
                    :limit="1000"
                    :editable="editable"
                  />
                </el-form-item>
              </el-form>
              <el-button :disabled="!editable" type="primary">提交</el-button>
              <el-button @click="canEdit = true" type="default"
                >重新评分</el-button
              >
            </el-tab-pane>
          </el-tabs>
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<style lang="scss" scoped>
.team-list {
  display: flex;
  flex-wrap: wrap;
  padding: 10px;
  .el-button {
    margin-top: 5px;
    margin-left: 0;
  }
}
</style>
