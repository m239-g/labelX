const state = {
  projects: [],
  labels: [],
  items: [],
  annotations: [],
  annotationReviews: {},
  importDraft: null,
  editingProjectId: null,
  selectedAnnotationId: null,
  selectedProjectId: null,
  selectedItemId: null,
  itemStatusFilter: "all",
  annotators: [],
  reviewers: [],
};

const text = {
  requestFailed: "\u8bf7\u6c42\u5931\u8d25\u3002",
  noProjects: "\u8fd8\u6ca1\u6709\u9879\u76ee\u3002",
  noDescription: "\u6682\u65e0\u63cf\u8ff0",
  noLabels: "\u8fd8\u6ca1\u6709\u6807\u7b7e\u3002",
  noItems: "\u8fd8\u6ca1\u6709\u6587\u672c\u6570\u636e\u3002",
  noImportPreview: "\u8bf7\u5148\u8f93\u5165\u6587\u672c\u6216\u9009\u62e9 txt/csv/json \u6587\u4ef6\uff0c\u518d\u70b9\u51fb\u89e3\u6790\u9884\u89c8\u3002",
  importPreviewTitle: "\u5bfc\u5165\u9884\u89c8",
  importPreviewSource: "\u89e3\u6790\u6765\u6e90",
  importPreviewType: "\u6587\u4ef6\u7c7b\u578b",
  importPreviewCount: "\u5171\u89e3\u6790",
  importPreviewShowing: "\u9884\u89c8\u524d 5 \u6761",
  importPreviewManual: "\u624b\u52a8\u7c98\u8d34",
  importPreviewUnknownType: "\u672a\u77e5",
  importReady: "\u683c\u5f0f\u68c0\u67e5\u901a\u8fc7\uff0c\u53ef\u4ee5\u70b9\u51fb\u786e\u8ba4\u5bfc\u5165\u3002",
  importNeedPreview: "\u8bf7\u5148\u89e3\u6790\u9884\u89c8\uff0c\u786e\u8ba4\u6570\u636e\u540e\u518d\u5bfc\u5165\u3002",
  importSourceMissing: "\u8bf7\u5148\u8f93\u5165\u6279\u91cf\u6587\u672c\u6216\u9009\u62e9\u5bfc\u5165\u6587\u4ef6\u3002",
  importUnsupportedFile: "\u53ea\u652f\u6301 txt/csv/json \u6587\u4ef6\u5bfc\u5165\u3002",
  importParseFailed: "\u6587\u4ef6\u89e3\u6790\u5931\u8d25\uff0c\u8bf7\u68c0\u67e5\u683c\u5f0f\u3002",
  importEmptyData: "\u6ca1\u6709\u89e3\u6790\u51fa\u53ef\u5bfc\u5165\u7684\u6587\u672c\u3002",
  noPredictions: "\u8fd8\u6ca1\u6709 AI \u9884\u6d4b\u3002",
  noAnnotations: "\u8fd8\u6ca1\u6709\u4eba\u5de5\u6807\u6ce8\u3002",
  noReviews: "\u8fd8\u6ca1\u6709\u590d\u6838\u8bb0\u5f55\u3002",
  noNotes: "\u6682\u65e0\u5907\u6ce8",
  noComment: "\u6682\u65e0\u610f\u89c1",
  noSource: "\u672a\u586b\u5199",
  noColor: "\u672a\u8bbe\u7f6e",
  noLabelDescription: "\u6682\u65e0\u8bf4\u660e",
  noConfidence: "\u6682\u65e0",
  noLabelOption: "\u6682\u65e0\u6807\u7b7e",
  noAnnotationOption: "\u6682\u65e0\u6807\u6ce8",
  noAnnotationSelected: "\u8bf7\u5148\u9009\u62e9\u4e00\u6761\u6807\u6ce8\u3002",
  unknownAnnotator: "\u672a\u77e5\u6807\u6ce8\u4eba",
  unknownReviewer: "\u672a\u77e5\u590d\u6838\u4eba",
  labelPrefix: "\u6807\u7b7e",
  projectPrefix: "\u9879\u76ee",
  approved: "\u901a\u8fc7",
  rejected: "\u9a73\u56de",
  reviewed: "\u5df2\u590d\u6838",
  reviewPending: "\u5f85\u590d\u6838",
  latestReview: "\u6700\u65b0\u590d\u6838",
  annotationDetailTitle: "\u5f53\u524d\u6807\u6ce8",
  annotatorName: "\u6807\u6ce8\u4eba",
  annotationTime: "\u6807\u6ce8\u65f6\u95f4",
  annotationNotes: "\u6807\u6ce8\u5907\u6ce8",
  reviewStatus: "\u590d\u6838\u72b6\u6001",
  confidence: "\u7f6e\u4fe1\u5ea6",
  pending: "\u5f85\u5904\u7406",
  predicted: "\u5df2\u9884\u6d4b",
  annotated: "\u5df2\u6807\u6ce8",
  labelCount: "\u6807\u7b7e\u6570",
  itemCount: "\u6587\u672c\u6570",
  predictionCount: "\u9884\u6d4b\u6570",
  annotationCount: "\u6807\u6ce8\u6570",
  reviewCount: "\u590d\u6838\u6570",
  statusStats: "\u72b6\u6001\u5206\u5e03",
  selectProjectFirst: "\u8bf7\u5148\u9009\u62e9\u9879\u76ee\u3002",
  selectItemFirst: "\u8bf7\u5148\u9009\u62e9\u6587\u672c\u3002",
  selectAnnotationFirst: "\u8bf7\u5148\u9009\u62e9\u6807\u6ce8\u8bb0\u5f55\u3002",
  previewEmpty: "\u8bf7\u5148\u4ece\u5de6\u4fa7\u9009\u62e9\u4e00\u6761\u6587\u672c\u3002",
  projectCreated: "\u9879\u76ee\u5df2\u521b\u5efa\u3002",
  projectUpdated: "\u9879\u76ee\u5df2\u66f4\u65b0\u3002",
  projectDeleted: "\u9879\u76ee\u5df2\u5220\u9664\u3002",
  projectDeleteConfirm: "\u786e\u8ba4\u5220\u9664\u8fd9\u4e2a\u9879\u76ee\uff1f\u8be5\u9879\u76ee\u4e0b\u7684\u6587\u672c\u3001\u6807\u7b7e\u3001\u6807\u6ce8\u548c\u590d\u6838\u8bb0\u5f55\u90fd\u4f1a\u88ab\u5220\u9664\u3002",
  createProjectAction: "\u521b\u5efa\u9879\u76ee",
  updateProjectAction: "\u4fdd\u5b58\u9879\u76ee",
  cancelEditProject: "\u53d6\u6d88\u7f16\u8f91",
  editProjectAction: "\u7f16\u8f91",
  deleteProjectAction: "\u5220\u9664",
  labelAdded: "\u6807\u7b7e\u5df2\u6dfb\u52a0\u3002",
  labelDeleted: "\u6807\u7b7e\u5df2\u5220\u9664\u3002",
  itemsImported: "\u6587\u672c\u5df2\u5bfc\u5165\u3002",
  predictionSaved: "\u9884\u6d4b\u5df2\u4fdd\u5b58\u3002",
  annotationSaved: "\u4eba\u5de5\u6807\u6ce8\u5df2\u4fdd\u5b58\u3002",
  annotationDeleted: "\u6807\u6ce8\u8bb0\u5f55\u5df2\u5220\u9664\u3002",
  reviewSaved: "\u590d\u6838\u8bb0\u5f55\u5df2\u4fdd\u5b58\u3002",
  reviewDeleted: "\u590d\u6838\u8bb0\u5f55\u5df2\u5220\u9664\u3002",
  itemIdLabel: "ID",
  sourceLabel: "\u6765\u6e90",
  statusIdle: "\u672a\u9009\u62e9",
  allStatus: "\u5168\u90e8\u72b6\u6001",
  savedAnnotator: "\u5df2\u4fdd\u5b58\u4e3a\u5e38\u7528\u6807\u6ce8\u4eba\u3002",
  savedReviewer: "\u5df2\u4fdd\u5b58\u4e3a\u5e38\u7528\u590d\u6838\u4eba\u3002",
  noPresetAnnotator: "\u9009\u62e9\u5e38\u7528\u6807\u6ce8\u4eba",
  noPresetReviewer: "\u9009\u62e9\u5e38\u7528\u590d\u6838\u4eba",
};

const elements = {
  projectList: document.getElementById("project-list"),
  itemList: document.getElementById("item-list"),
  labelButtons: document.getElementById("label-buttons"),
  labelList: document.getElementById("label-list"),
  predictionList: document.getElementById("prediction-list"),
  annotationList: document.getElementById("annotation-list"),
  annotationDetail: document.getElementById("annotation-detail"),
  reviewList: document.getElementById("review-list"),
  statsGrid: document.getElementById("stats-grid"),
  selectedProject: document.getElementById("selected-project"),
  predictionLabelSelect: document.getElementById("prediction-label-id"),
  annotationLabelSelect: document.getElementById("annotation-label-id"),
  reviewAnnotationSelect: document.getElementById("review-annotation-id"),
  itemPreview: document.getElementById("item-preview"),
  itemStatus: document.getElementById("item-status"),
  itemIdLabel: document.getElementById("item-id-label"),
  itemSourceLabel: document.getElementById("item-source-label"),
  itemStatusFilter: document.getElementById("item-status-filter"),
  itemCountTip: document.getElementById("item-count-tip"),
  itemImportFile: document.getElementById("item-import-file"),
  itemImportPreview: document.getElementById("item-import-preview"),
  prevItemButton: document.getElementById("prev-item-button"),
  nextItemButton: document.getElementById("next-item-button"),
  annotatorSelect: document.getElementById("annotator-select"),
  reviewerSelect: document.getElementById("reviewer-select"),
  toast: document.getElementById("toast"),
};

const projectForm = document.getElementById("project-form");
const labelForm = document.getElementById("label-form");
const itemForm = document.getElementById("item-form");
const predictionForm = document.getElementById("prediction-form");
const annotationForm = document.getElementById("annotation-form");
const reviewForm = document.getElementById("review-form");
const refreshProjectsButton = document.getElementById("refresh-projects");
const previewImportButton = document.getElementById("preview-import-button");
const clearImportPreviewButton = document.getElementById("clear-import-preview-button");
const resetImportFileButton = document.getElementById("reset-import-file-button");
const projectSubmitButton = document.getElementById("project-submit-button");
const projectCancelButton = document.getElementById("project-cancel-button");
const annotatorStorageKey = "annotation_mvp_annotators";
const reviewerStorageKey = "annotation_mvp_reviewers";

async function api(path, options = {}) {
  const response = await fetch(path, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ detail: text.requestFailed }));
    throw new Error(error.detail || text.requestFailed);
  }

  if (response.status === 204) {
    return null;
  }

  return response.json();
}

function showToast(message, isError = false) {
  elements.toast.textContent = message;
  elements.toast.classList.remove("hidden");
  elements.toast.style.background = isError ? "#8b2d2d" : "#1f2937";
  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(() => elements.toast.classList.add("hidden"), 2500);
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function findLabelName(labelId) {
  return state.labels.find((label) => label.id === labelId)?.name || `${text.labelPrefix} ${labelId}`;
}

function getSelectedItem() {
  return state.items.find((item) => item.id === state.selectedItemId) || null;
}

function getSelectedAnnotationId() {
  if (state.annotations.some((annotation) => annotation.id === state.selectedAnnotationId)) {
    return state.selectedAnnotationId;
  }
  return state.annotations[0]?.id ?? null;
}

function getSelectedAnnotation() {
  return state.annotations.find((annotation) => annotation.id === state.selectedAnnotationId) || null;
}

function getAnnotationReviews(annotationId) {
  return state.annotationReviews[annotationId] || [];
}

function getAnnotationReviewStatus(annotationId) {
  return getAnnotationReviews(annotationId).length ? text.reviewed : text.reviewPending;
}

function formatDateTime(value) {
  if (!value) {
    return "-";
  }

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return date.toLocaleString("zh-CN", {
    hour12: false,
  });
}

function getFilteredItems() {
  if (state.itemStatusFilter === "all") {
    return state.items;
  }
  return state.items.filter((item) => item.status === state.itemStatusFilter);
}

function resetImportDraft() {
  state.importDraft = null;
  elements.itemImportPreview.className = "import-preview empty-state";
  elements.itemImportPreview.textContent = text.noImportPreview;
}

function clearImportWorkflow(resetFile = false) {
  resetImportDraft();
  itemForm.elements.items.value = "";
  if (resetFile) {
    elements.itemImportFile.value = "";
  }
}

function readFileAsText(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result || ""));
    reader.onerror = () => reject(new Error(text.importParseFailed));
    reader.readAsText(file, "utf-8");
  });
}

function parseLineBasedText(rawText) {
  return rawText
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);
}

function parseCsvRow(line) {
  const cells = [];
  let current = "";
  let inQuotes = false;

  for (let index = 0; index < line.length; index += 1) {
    const char = line[index];
    const nextChar = line[index + 1];

    if (char === '"') {
      if (inQuotes && nextChar === '"') {
        current += '"';
        index += 1;
      } else {
        inQuotes = !inQuotes;
      }
      continue;
    }

    if (char === "," && !inQuotes) {
      cells.push(current.trim());
      current = "";
      continue;
    }

    current += char;
  }

  cells.push(current.trim());
  return cells;
}

function parseCsvText(rawText) {
  const rows = rawText
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean)
    .map(parseCsvRow);

  if (!rows.length) {
    return [];
  }

  const headerRow = rows[0].map((cell) => cell.toLowerCase());
  const contentColumnIndex = headerRow.findIndex((cell) => ["content", "text", "message"].includes(cell));

  if (contentColumnIndex >= 0) {
    return rows
      .slice(1)
      .map((row) => row[contentColumnIndex]?.trim())
      .filter(Boolean);
  }

  return rows
    .map((row) => row.filter(Boolean).join(" ").trim())
    .filter(Boolean);
}

function extractJsonText(entry) {
  if (typeof entry === "string") {
    return entry.trim();
  }

  if (!entry || typeof entry !== "object") {
    return "";
  }

  for (const key of ["content", "text", "message", "value"]) {
    if (typeof entry[key] === "string" && entry[key].trim()) {
      return entry[key].trim();
    }
  }

  const firstStringValue = Object.values(entry).find((value) => typeof value === "string" && value.trim());
  return typeof firstStringValue === "string" ? firstStringValue.trim() : "";
}

function parseJsonText(rawText) {
  const trimmed = rawText.trim();
  if (!trimmed) {
    return [];
  }

  const parsed = JSON.parse(trimmed);

  if (Array.isArray(parsed)) {
    return parsed.map(extractJsonText).filter(Boolean);
  }

  if (Array.isArray(parsed.items)) {
    return parsed.items.map(extractJsonText).filter(Boolean);
  }

  const single = extractJsonText(parsed);
  return single ? [single] : [];
}

function getImportSourceName(file, fallbackSource) {
  return file?.name || String(fallbackSource || "").trim() || null;
}

async function buildImportDraft() {
  const file = elements.itemImportFile.files?.[0] || null;
  const manualText = itemForm.elements.items.value || "";
  const sourceValue = itemForm.elements.source.value || "";

  if (!file && !manualText.trim()) {
    throw new Error(text.importSourceMissing);
  }

  let parsedItems = [];
  let sourceName = getImportSourceName(file, sourceValue);
  let sourceType = file ? file.name.split(".").pop()?.toLowerCase() || text.importPreviewUnknownType : text.importPreviewManual;

  if (file) {
    const extension = file.name.split(".").pop()?.toLowerCase();
    const rawText = await readFileAsText(file);

    if (extension === "txt") {
      parsedItems = parseLineBasedText(rawText);
    } else if (extension === "csv") {
      parsedItems = parseCsvText(rawText);
    } else if (extension === "json") {
      parsedItems = parseJsonText(rawText);
    } else {
      throw new Error(text.importUnsupportedFile);
    }
  } else {
    parsedItems = parseLineBasedText(manualText);
  }

  if (!parsedItems.length) {
    throw new Error(text.importEmptyData);
  }

  return {
    sourceName,
    sourceType,
    items: parsedItems,
  };
}

function renderImportPreview() {
  if (!state.importDraft) {
    resetImportDraft();
    return;
  }

  const previewItems = state.importDraft.items.slice(0, 5);
  elements.itemImportPreview.className = "import-preview";
  elements.itemImportPreview.innerHTML = `
    <div class="import-preview-head">
      <strong>${text.importPreviewTitle}</strong>
      <span class="meta">${text.importPreviewCount} ${state.importDraft.items.length} ${text.itemCount}</span>
    </div>
    <div class="import-preview-meta-grid">
      <div>
        <span class="detail-label">${text.importPreviewSource}</span>
        <strong>${escapeHtml(state.importDraft.sourceName || text.importPreviewManual)}</strong>
      </div>
      <div>
        <span class="detail-label">${text.importPreviewType}</span>
        <strong>${escapeHtml(state.importDraft.sourceType || text.importPreviewUnknownType)}</strong>
      </div>
    </div>
    <div class="meta">${text.importPreviewShowing}</div>
    <div class="import-preview-list">
      ${previewItems
        .map(
          (content, index) => `
            <div class="import-preview-item">
              <span class="preview-index">#${index + 1}</span>
              <div>${escapeHtml(content)}</div>
            </div>
          `,
        )
        .join("")}
    </div>
    <div class="mini-hint">${escapeHtml(state.importDraft.sourceName || text.noSource)}</div>
    <div class="mini-hint">${text.importReady}</div>
  `;
}

async function previewImportData() {
  try {
    state.importDraft = await buildImportDraft();
    renderImportPreview();
  } catch (error) {
    state.importDraft = null;
    resetImportDraft();
    showToast(error.message || text.importParseFailed, true);
  }
}

function loadSavedRoles() {
  state.annotators = JSON.parse(localStorage.getItem(annotatorStorageKey) || "[]");
  state.reviewers = JSON.parse(localStorage.getItem(reviewerStorageKey) || "[]");
}

function saveRole(storageKey, values) {
  localStorage.setItem(storageKey, JSON.stringify(values));
}

function rememberRole(roleType, name) {
  const value = String(name || "").trim();
  if (!value) {
    return false;
  }

  if (roleType === "annotator") {
    if (!state.annotators.includes(value)) {
      state.annotators = [value, ...state.annotators].slice(0, 8);
      saveRole(annotatorStorageKey, state.annotators);
      renderRoleSelects();
      return true;
    }
    return false;
  }

  if (!state.reviewers.includes(value)) {
    state.reviewers = [value, ...state.reviewers].slice(0, 8);
    saveRole(reviewerStorageKey, state.reviewers);
    renderRoleSelects();
    return true;
  }
  return false;
}

function getRoleName(presetValue, inputValue) {
  return String(inputValue || "").trim() || String(presetValue || "").trim() || null;
}

function renderRoleSelects() {
  elements.annotatorSelect.innerHTML = [
    `<option value="">${text.noPresetAnnotator}</option>`,
    ...state.annotators.map((name) => `<option value="${escapeHtml(name)}">${escapeHtml(name)}</option>`),
  ].join("");

  elements.reviewerSelect.innerHTML = [
    `<option value="">${text.noPresetReviewer}</option>`,
    ...state.reviewers.map((name) => `<option value="${escapeHtml(name)}">${escapeHtml(name)}</option>`),
  ].join("");
}

function renderProjects() {
  if (!state.projects.length) {
    elements.projectList.innerHTML = `<div class="empty-state">${text.noProjects}</div>`;
    return;
  }

  elements.projectList.innerHTML = state.projects
    .map(
      (project) => `
        <div class="project-item ${project.id === state.selectedProjectId ? "selected" : ""}">
          <button class="project-select-button" type="button" data-project-id="${project.id}">
            <div class="list-title">
              <strong>${escapeHtml(project.name)}</strong>
              <span class="meta">${escapeHtml(project.status)}</span>
            </div>
            <div class="meta">${escapeHtml(project.description || text.noDescription)}</div>
          </button>
          <div class="record-actions">
            <button type="button" class="ghost-button" data-edit-project-id="${project.id}">${text.editProjectAction}</button>
            <button type="button" class="danger-button" data-delete-project-id="${project.id}">${text.deleteProjectAction}</button>
          </div>
        </div>
      `,
    )
    .join("");

  document.querySelectorAll("[data-project-id]").forEach((button) => {
    button.addEventListener("click", () => selectProject(Number(button.dataset.projectId)));
  });

  document.querySelectorAll("[data-edit-project-id]").forEach((button) => {
    button.addEventListener("click", () => startProjectEdit(Number(button.dataset.editProjectId)));
  });

  document.querySelectorAll("[data-delete-project-id]").forEach((button) => {
    button.addEventListener("click", async () => {
      await deleteProject(Number(button.dataset.deleteProjectId));
    });
  });
}

function resetProjectForm() {
  state.editingProjectId = null;
  projectForm.reset();
  projectSubmitButton.textContent = text.createProjectAction;
  projectCancelButton.classList.add("hidden");
}

function startProjectEdit(projectId) {
  const project = state.projects.find((item) => item.id === projectId);
  if (!project) {
    return;
  }

  state.editingProjectId = projectId;
  projectForm.elements.name.value = project.name;
  projectForm.elements.description.value = project.description || "";
  projectSubmitButton.textContent = text.updateProjectAction;
  projectCancelButton.classList.remove("hidden");
}

function renderItems() {
  const filteredItems = getFilteredItems();
  elements.itemCountTip.textContent = `${filteredItems.length} / ${state.items.length}`;

  if (!filteredItems.length) {
    elements.itemList.innerHTML = `<div class="empty-state">${text.noItems}</div>`;
    return;
  }

  elements.itemList.innerHTML = filteredItems
    .map(
      (item) => `
        <button class="item-card ${item.id === state.selectedItemId ? "selected" : ""}" data-item-id="${item.id}">
          <div class="list-title">
            <strong>#${item.id}</strong>
            <span class="meta">${escapeHtml(item.status)}</span>
          </div>
          <div class="item-snippet">${escapeHtml(item.content)}</div>
        </button>
      `,
    )
    .join("");

  document.querySelectorAll("[data-item-id]").forEach((button) => {
    button.addEventListener("click", () => selectItem(Number(button.dataset.itemId)));
  });
}

function renderLabelButtons() {
  populateLabelSelects();
  if (!state.labels.length) {
    elements.labelButtons.innerHTML = `<div class="empty-state">${text.noLabels}</div>`;
    renderLabelList();
    return;
  }

  elements.labelButtons.innerHTML = state.labels
    .map(
      (label) => `
        <button type="button" class="label-pill-button" data-fill-label-id="${label.id}">
          <strong>${escapeHtml(label.name)}</strong>
          <div class="meta">${escapeHtml(label.color || text.noColor)}</div>
        </button>
      `,
    )
    .join("");

  document.querySelectorAll("[data-fill-label-id]").forEach((button) => {
    button.addEventListener("click", () => {
      const labelId = button.dataset.fillLabelId;
      elements.predictionLabelSelect.value = labelId;
      elements.annotationLabelSelect.value = labelId;
      if (state.selectedItemId) {
        quickAnnotate(Number(labelId));
      }
    });
  });

  renderLabelList();
}

function renderLabelList() {
  renderRecordList(
    elements.labelList,
    state.labels,
    (label) => `
      <div class="list-title">
        <strong>${escapeHtml(label.name)}</strong>
        <span class="meta">${escapeHtml(label.color || text.noColor)}</span>
      </div>
      <div class="meta">${escapeHtml(label.description || text.noLabelDescription)}</div>
      <div class="record-actions">
        <button type="button" class="danger-button" data-delete-label-id="${label.id}">\u5220\u9664</button>
      </div>
    `,
    text.noLabels,
  );

  document.querySelectorAll("[data-delete-label-id]").forEach((button) => {
    button.addEventListener("click", async () => {
      await deleteLabel(Number(button.dataset.deleteLabelId));
    });
  });
}

function renderStats(stats) {
  elements.statsGrid.classList.remove("empty-state");
  elements.statsGrid.innerHTML = `
    <div class="stat-card"><span class="stat-label">${text.labelCount}</span><span class="stat-value">${stats.label_count}</span></div>
    <div class="stat-card"><span class="stat-label">${text.itemCount}</span><span class="stat-value">${stats.item_count}</span></div>
    <div class="stat-card"><span class="stat-label">${text.predictionCount}</span><span class="stat-value">${stats.prediction_count}</span></div>
    <div class="stat-card"><span class="stat-label">${text.annotationCount}</span><span class="stat-value">${stats.annotation_count}</span></div>
    <div class="stat-card"><span class="stat-label">${text.reviewCount}</span><span class="stat-value">${stats.review_count}</span></div>
    <div class="stat-card"><span class="stat-label">${text.statusStats}</span><span class="meta">${text.pending} ${stats.item_status.pending} / ${text.predicted} ${stats.item_status.predicted} / ${text.annotated} ${stats.item_status.annotated}</span></div>
  `;
}

function renderPreview(item) {
  if (!item) {
    elements.itemPreview.className = "content-preview empty-state";
    elements.itemPreview.textContent = text.previewEmpty;
    elements.itemStatus.textContent = text.statusIdle;
    elements.itemIdLabel.textContent = `${text.itemIdLabel}: -`;
    elements.itemSourceLabel.textContent = `${text.sourceLabel}: -`;
    return;
  }

  elements.itemPreview.className = "content-preview";
  elements.itemPreview.textContent = item.content;
  elements.itemStatus.textContent = item.status;
  elements.itemIdLabel.textContent = `${text.itemIdLabel}: ${item.id}`;
  elements.itemSourceLabel.textContent = `${text.sourceLabel}: ${item.source || text.noSource}`;
}

function renderRecordList(container, items, renderRow, emptyMessage) {
  if (!items.length) {
    container.innerHTML = `<div class="empty-state">${emptyMessage}</div>`;
    return;
  }

  container.innerHTML = items
    .map((item) => `<div class="record-card">${renderRow(item)}</div>`)
    .join("");
}

function renderPredictions(items) {
  renderRecordList(
    elements.predictionList,
    items,
    (prediction) => `
      <div class="list-title">
        <strong>${escapeHtml(findLabelName(prediction.label_id))}</strong>
        <span class="meta">${escapeHtml(prediction.model_name)}</span>
      </div>
      <div class="meta">${text.confidence}: ${prediction.confidence ?? text.noConfidence}</div>
    `,
    text.noPredictions,
  );
}

function renderAnnotationDetail() {
  const annotation = getSelectedAnnotation();
  if (!annotation) {
    elements.annotationDetail.className = "annotation-detail empty-state";
    elements.annotationDetail.textContent = text.noAnnotationSelected;
    return;
  }

  const reviews = getAnnotationReviews(annotation.id);
  const latestReview = reviews[0] || null;
  const latestReviewText = latestReview
    ? `${latestReview.is_approved ? text.approved : text.rejected} / ${escapeHtml(latestReview.reviewer_name || text.unknownReviewer)}`
    : text.reviewPending;

  elements.annotationDetail.className = "annotation-detail";
  elements.annotationDetail.innerHTML = `
    <div class="annotation-detail-head">
      <strong>${text.annotationDetailTitle} #${annotation.id}</strong>
      <span class="annotation-status ${reviews.length ? "reviewed" : "pending"}">${getAnnotationReviewStatus(annotation.id)}</span>
    </div>
    <div class="annotation-detail-grid">
      <div><span class="detail-label">${text.labelPrefix}</span><strong>${escapeHtml(findLabelName(annotation.label_id))}</strong></div>
      <div><span class="detail-label">${text.annotatorName}</span><strong>${escapeHtml(annotation.annotator_name || text.unknownAnnotator)}</strong></div>
      <div><span class="detail-label">${text.annotationTime}</span><strong>${escapeHtml(formatDateTime(annotation.created_at))}</strong></div>
      <div><span class="detail-label">${text.reviewStatus}</span><strong>${escapeHtml(getAnnotationReviewStatus(annotation.id))}</strong></div>
      <div><span class="detail-label">${text.latestReview}</span><strong>${latestReviewText}</strong></div>
    </div>
    <div class="annotation-detail-notes">
      <span class="detail-label">${text.annotationNotes}</span>
      <div>${escapeHtml(annotation.notes || text.noNotes)}</div>
    </div>
  `;
}

function renderAnnotations(items) {
  state.annotations = items;
  state.selectedAnnotationId = getSelectedAnnotationId();
  populateReviewAnnotations();

  if (!items.length) {
    elements.annotationList.innerHTML = `<div class="empty-state">${text.noAnnotations}</div>`;
    renderAnnotationDetail();
    return;
  }

  elements.annotationList.innerHTML = items
    .map(
      (annotation) => `
        <div class="record-card annotation-card ${annotation.id === state.selectedAnnotationId ? "selected" : ""}" data-annotation-id="${annotation.id}">
          <button type="button" class="annotation-card-button">
            <div class="list-title">
              <strong>${escapeHtml(findLabelName(annotation.label_id))}</strong>
              <span class="annotation-status ${getAnnotationReviews(annotation.id).length ? "reviewed" : "pending"}">${getAnnotationReviewStatus(annotation.id)}</span>
            </div>
            <div class="meta">${escapeHtml(annotation.annotator_name || text.unknownAnnotator)}</div>
            <div class="meta">${escapeHtml(annotation.notes || text.noNotes)}</div>
          </button>
          <div class="record-actions">
            <button type="button" class="danger-button" data-delete-annotation-id="${annotation.id}">\u5220\u9664</button>
          </div>
        </div>
      `,
    )
    .join("");

  document.querySelectorAll("[data-annotation-id]").forEach((card) => {
    const button = card.querySelector(".annotation-card-button");
    button.addEventListener("click", async () => {
      await selectAnnotation(Number(card.dataset.annotationId));
    });
  });

  document.querySelectorAll("[data-delete-annotation-id]").forEach((button) => {
    button.addEventListener("click", async (event) => {
      event.stopPropagation();
      await deleteAnnotation(Number(button.dataset.deleteAnnotationId));
    });
  });

  renderAnnotationDetail();
}

function renderReviews(items) {
  renderRecordList(
    elements.reviewList,
    items,
    (review) => `
      <div class="list-title">
        <strong>${review.is_approved ? text.approved : text.rejected}</strong>
        <span class="meta">${escapeHtml(review.reviewer_name || text.unknownReviewer)}</span>
      </div>
      <div class="meta">${escapeHtml(review.comment || text.noComment)}</div>
      <div class="record-actions">
        <button type="button" class="danger-button" data-delete-review-id="${review.id}">\u5220\u9664</button>
      </div>
    `,
    text.noReviews,
  );

  document.querySelectorAll("[data-delete-review-id]").forEach((button) => {
    button.addEventListener("click", async () => {
      await deleteReview(Number(button.dataset.deleteReviewId));
    });
  });
}

function populateLabelSelects() {
  const options = state.labels.length
    ? state.labels.map((label) => `<option value="${label.id}">${escapeHtml(label.name)}</option>`).join("")
    : `<option value="">${text.noLabelOption}</option>`;

  elements.predictionLabelSelect.innerHTML = options;
  elements.annotationLabelSelect.innerHTML = options;
}

function populateReviewAnnotations() {
  const options = state.annotations.length
    ? state.annotations
        .map(
          (annotation) =>
            `<option value="${annotation.id}" ${annotation.id === state.selectedAnnotationId ? "selected" : ""}>#${annotation.id} - ${escapeHtml(findLabelName(annotation.label_id))}</option>`,
        )
        .join("")
    : `<option value="">${text.noAnnotationOption}</option>`;

  elements.reviewAnnotationSelect.innerHTML = options;
}

function renderSelectedAnnotationReviews() {
  const annotationId = state.selectedAnnotationId;
  if (!annotationId) {
    renderReviews([]);
    return;
  }

  renderReviews(getAnnotationReviews(annotationId));
}

function updateNavButtons() {
  const filteredItems = getFilteredItems();
  const currentIndex = filteredItems.findIndex((item) => item.id === state.selectedItemId);
  elements.prevItemButton.disabled = currentIndex <= 0;
  elements.nextItemButton.disabled = currentIndex === -1 || currentIndex >= filteredItems.length - 1;
}

async function stepItem(offset) {
  const filteredItems = getFilteredItems();
  const currentIndex = filteredItems.findIndex((item) => item.id === state.selectedItemId);
  if (currentIndex === -1) {
    if (filteredItems[0]) {
      await selectItem(filteredItems[0].id);
    }
    return;
  }

  const nextItem = filteredItems[currentIndex + offset];
  if (nextItem) {
    await selectItem(nextItem.id);
  }
}

async function quickAnnotate(labelId) {
  if (!state.selectedItemId) {
    showToast(text.selectItemFirst, true);
    return;
  }

  const annotatorName = getRoleName(elements.annotatorSelect.value, annotationForm.elements.annotator_name.value);
  try {
    await api(`/items/${state.selectedItemId}/annotations`, {
      method: "POST",
      body: JSON.stringify({
        label_id: labelId,
        annotator_name: annotatorName,
        notes: annotationForm.elements.notes.value || null,
        is_final: true,
      }),
    });
    if (rememberRole("annotator", annotatorName)) {
      showToast(`${text.annotationSaved} ${text.savedAnnotator}`);
    } else {
      showToast(text.annotationSaved);
    }
    await refreshProjectWorkspace(state.selectedProjectId);
    await loadItemRecords(state.selectedItemId);
    await stepItem(1);
  } catch (error) {
    showToast(error.message, true);
  }
}

async function deleteAnnotation(annotationId) {
  try {
    const currentAnnotations = [...state.annotations];
    const currentIndex = currentAnnotations.findIndex((annotation) => annotation.id === annotationId);
    const fallbackAnnotation =
      currentAnnotations[currentIndex + 1] || currentAnnotations[currentIndex - 1] || null;

    await api(`/annotations/${annotationId}`, { method: "DELETE" });
    delete state.annotationReviews[annotationId];
    if (state.selectedAnnotationId === annotationId) {
      state.selectedAnnotationId = fallbackAnnotation?.id ?? null;
    }
    await refreshProjectWorkspace(state.selectedProjectId);
    if (state.selectedItemId) {
      await loadItemRecords(state.selectedItemId);
    }
    showToast(text.annotationDeleted);
  } catch (error) {
    showToast(error.message, true);
  }
}

async function deleteLabel(labelId) {
  try {
    await api(`/labels/${labelId}`, { method: "DELETE" });
    await refreshProjectWorkspace(state.selectedProjectId);
    showToast(text.labelDeleted);
  } catch (error) {
    showToast(error.message, true);
  }
}

async function deleteReview(reviewId) {
  try {
    await api(`/reviews/${reviewId}`, { method: "DELETE" });
    if (state.selectedItemId) {
      await loadItemRecords(state.selectedItemId);
    }
    await refreshProjectStats(state.selectedProjectId);
    showToast(text.reviewDeleted);
  } catch (error) {
    showToast(error.message, true);
  }
}

async function loadProjects() {
  state.projects = await api("/projects");
  renderProjects();
}

async function deleteProject(projectId) {
  if (!window.confirm(text.projectDeleteConfirm)) {
    return;
  }

  try {
    await api(`/projects/${projectId}`, { method: "DELETE" });
    if (state.selectedProjectId === projectId) {
      state.selectedProjectId = null;
      state.selectedItemId = null;
      state.selectedAnnotationId = null;
      state.labels = [];
      state.items = [];
      state.annotations = [];
      state.annotationReviews = {};
      elements.selectedProject.textContent = "\u5c1a\u672a\u9009\u62e9\u9879\u76ee";
      renderItems();
      renderLabelButtons();
      renderPreview(null);
      renderPredictions([]);
      renderAnnotations([]);
      renderReviews([]);
      elements.statsGrid.className = "stats-grid empty-state";
      elements.statsGrid.textContent = "\u8bf7\u5148\u9009\u62e9\u9879\u76ee\u3002";
    }
    if (state.editingProjectId === projectId) {
      resetProjectForm();
    }
    await loadProjects();
    showToast(text.projectDeleted);
  } catch (error) {
    showToast(error.message, true);
  }
}

async function refreshProjectWorkspace(projectId) {
  const [labels, items, stats] = await Promise.all([
    api(`/projects/${projectId}/labels`),
    api(`/projects/${projectId}/items`),
    api(`/projects/${projectId}/stats`),
  ]);

  state.labels = labels;
  state.items = items;

  if (!state.items.some((item) => item.id === state.selectedItemId)) {
    state.selectedItemId = state.items[0]?.id ?? null;
  }

  renderLabelButtons();
  renderItems();
  renderStats(stats);
  renderPreview(getSelectedItem());
  updateNavButtons();

  if (state.selectedItemId) {
    await loadItemRecords(state.selectedItemId);
  } else {
    renderPredictions([]);
    renderAnnotations([]);
    renderReviews([]);
  }
}

async function refreshProjectStats(projectId) {
  if (!projectId) {
    return;
  }

  const stats = await api(`/projects/${projectId}/stats`);
  renderStats(stats);
}

async function selectProject(projectId) {
  state.selectedProjectId = projectId;
  elements.selectedProject.textContent =
    state.projects.find((project) => project.id === projectId)?.name || `${text.projectPrefix} ${projectId}`;
  renderProjects();
  await refreshProjectWorkspace(projectId);
}

async function loadItemRecords(itemId) {
  const [predictions, annotations] = await Promise.all([
    api(`/items/${itemId}/predictions`),
    api(`/items/${itemId}/annotations`),
  ]);
  const annotationReviews = Object.fromEntries(
    await Promise.all(
      annotations.map(async (annotation) => [
        annotation.id,
        await api(`/annotations/${annotation.id}/reviews`),
      ]),
    ),
  );

  state.annotationReviews = annotationReviews;
  renderPredictions(predictions);
  renderAnnotations(annotations);
  renderSelectedAnnotationReviews();
}

async function selectItem(itemId) {
  state.selectedItemId = itemId;
  renderItems();
  renderPreview(getSelectedItem());
  updateNavButtons();
  await loadItemRecords(itemId);
}

async function selectAnnotation(annotationId) {
  state.selectedAnnotationId = annotationId;
  populateReviewAnnotations();
  renderAnnotations(state.annotations);
  renderSelectedAnnotationReviews();
}

projectForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const formData = new FormData(projectForm);
  try {
    const isEditing = Boolean(state.editingProjectId);
    const path = isEditing ? `/projects/${state.editingProjectId}` : "/projects";
    const method = isEditing ? "PATCH" : "POST";

    const project = await api(path, {
      method,
      body: JSON.stringify({
        name: formData.get("name"),
        description: formData.get("description"),
        ...(isEditing ? {} : { task_type: "single_label_classification" }),
      }),
    });
    resetProjectForm();
    await loadProjects();
    if (isEditing) {
      state.selectedProjectId = project.id;
      await selectProject(project.id);
      showToast(text.projectUpdated);
    } else {
      showToast(text.projectCreated);
    }
  } catch (error) {
    showToast(error.message, true);
  }
});

labelForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  if (!state.selectedProjectId) {
    showToast(text.selectProjectFirst, true);
    return;
  }

  const formData = new FormData(labelForm);
  try {
    await api(`/projects/${state.selectedProjectId}/labels`, {
      method: "POST",
      body: JSON.stringify({
        name: formData.get("name"),
        color: formData.get("color") || null,
        description: formData.get("description") || null,
        display_order: state.labels.length + 1,
      }),
    });
    labelForm.reset();
    await refreshProjectWorkspace(state.selectedProjectId);
    showToast(text.labelAdded);
  } catch (error) {
    showToast(error.message, true);
  }
});

itemForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  if (!state.selectedProjectId) {
    showToast(text.selectProjectFirst, true);
    return;
  }

  if (!state.importDraft?.items?.length) {
    showToast(text.importNeedPreview, true);
    return;
  }

  try {
    await api(`/projects/${state.selectedProjectId}/items`, {
      method: "POST",
      body: JSON.stringify({
        items: state.importDraft.items.map((content, index) => ({
          external_id: `import-${Date.now()}-${index + 1}`,
          content,
          source: state.importDraft.sourceName,
        })),
      }),
    });
    itemForm.reset();
    resetImportDraft();
    await refreshProjectWorkspace(state.selectedProjectId);
    showToast(text.itemsImported);
  } catch (error) {
    showToast(error.message, true);
  }
});

predictionForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  if (!state.selectedItemId) {
    showToast(text.selectItemFirst, true);
    return;
  }

  const formData = new FormData(predictionForm);
  try {
    await api(`/items/${state.selectedItemId}/predictions`, {
      method: "POST",
      body: JSON.stringify({
        label_id: Number(formData.get("label_id")),
        model_name: formData.get("model_name"),
        confidence: formData.get("confidence") ? Number(formData.get("confidence")) : null,
      }),
    });
    predictionForm.reset();
    await refreshProjectWorkspace(state.selectedProjectId);
    await loadItemRecords(state.selectedItemId);
    showToast(text.predictionSaved);
  } catch (error) {
    showToast(error.message, true);
  }
});

annotationForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  if (!state.selectedItemId) {
    showToast(text.selectItemFirst, true);
    return;
  }

  const formData = new FormData(annotationForm);
  const annotatorName = getRoleName(formData.get("annotator_preset"), formData.get("annotator_name"));
  try {
    await api(`/items/${state.selectedItemId}/annotations`, {
      method: "POST",
      body: JSON.stringify({
        label_id: Number(formData.get("label_id")),
        annotator_name: annotatorName,
        notes: formData.get("notes") || null,
        is_final: true,
      }),
    });
    const remembered = rememberRole("annotator", annotatorName);
    annotationForm.reset();
    await refreshProjectWorkspace(state.selectedProjectId);
    await loadItemRecords(state.selectedItemId);
    showToast(remembered ? `${text.annotationSaved} ${text.savedAnnotator}` : text.annotationSaved);
  } catch (error) {
    showToast(error.message, true);
  }
});

reviewForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const formData = new FormData(reviewForm);
  const annotationId = Number(formData.get("annotation_id"));
  const reviewerName = getRoleName(formData.get("reviewer_preset"), formData.get("reviewer_name"));

  if (!annotationId) {
    showToast(text.selectAnnotationFirst, true);
    return;
  }

  try {
    await api(`/annotations/${annotationId}/reviews`, {
      method: "POST",
      body: JSON.stringify({
        reviewer_name: reviewerName,
        is_approved: formData.get("is_approved") === "true",
        comment: formData.get("comment") || null,
      }),
    });
    const remembered = rememberRole("reviewer", reviewerName);
    reviewForm.reset();
    state.selectedAnnotationId = annotationId;
    await loadItemRecords(state.selectedItemId);
    await refreshProjectStats(state.selectedProjectId);
    showToast(remembered ? `${text.reviewSaved} ${text.savedReviewer}` : text.reviewSaved);
  } catch (error) {
    showToast(error.message, true);
  }
});

refreshProjectsButton.addEventListener("click", loadProjects);
previewImportButton.addEventListener("click", () => {
  void previewImportData();
});
clearImportPreviewButton.addEventListener("click", () => {
  clearImportWorkflow(false);
});
resetImportFileButton.addEventListener("click", () => {
  clearImportWorkflow(true);
  itemForm.elements.source.value = "";
});
projectCancelButton.addEventListener("click", resetProjectForm);
elements.itemImportFile.addEventListener("change", () => {
  state.importDraft = null;
  resetImportDraft();
  const file = elements.itemImportFile.files?.[0];
  if (file && !itemForm.elements.source.value.trim()) {
    itemForm.elements.source.value = file.name;
  }
});
itemForm.elements.items.addEventListener("input", resetImportDraft);
itemForm.elements.source.addEventListener("input", () => {
  if (state.importDraft) {
    state.importDraft.sourceName = String(itemForm.elements.source.value || "").trim() || state.importDraft.sourceName;
    renderImportPreview();
  }
});
elements.reviewAnnotationSelect.addEventListener("change", async (event) => {
  const annotationId = Number(event.target.value);
  state.selectedAnnotationId = annotationId || null;
  renderAnnotations(state.annotations);
  renderSelectedAnnotationReviews();
});
elements.itemStatusFilter.addEventListener("change", async (event) => {
  state.itemStatusFilter = event.target.value;
  renderItems();
  updateNavButtons();
  const filteredItems = getFilteredItems();
  if (state.selectedItemId && !filteredItems.some((item) => item.id === state.selectedItemId)) {
    if (filteredItems[0]) {
      await selectItem(filteredItems[0].id);
    } else {
      state.selectedItemId = null;
      state.selectedAnnotationId = null;
      state.annotationReviews = {};
      renderPreview(null);
      renderPredictions([]);
      renderAnnotations([]);
      renderReviews([]);
      updateNavButtons();
    }
  }
});
elements.prevItemButton.addEventListener("click", () => stepItem(-1));
elements.nextItemButton.addEventListener("click", () => stepItem(1));

loadSavedRoles();
renderRoleSelects();
resetProjectForm();
renderPreview(null);
renderPredictions([]);
renderAnnotations([]);
renderReviews([]);
resetImportDraft();
loadProjects().catch((error) => showToast(error.message, true));
