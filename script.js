const menuButton = document.querySelector('.menu-toggle');
const primaryNav = document.querySelector('.primary-nav');

function closeMenu() {
  if (!menuButton || !primaryNav) return;
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.setAttribute('aria-label', 'Open navigation');
  primaryNav.classList.remove('is-open');
}

menuButton?.addEventListener('click', () => {
  const open = menuButton.getAttribute('aria-expanded') !== 'true';
  menuButton.setAttribute('aria-expanded', String(open));
  menuButton.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
  primaryNav.classList.toggle('is-open', open);
});

primaryNav?.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', event => {
  if (event.key === 'Escape') closeMenu();
});
window.addEventListener('resize', () => {
  if (window.innerWidth > 780) closeMenu();
});

const productChoices = [...document.querySelectorAll('[data-product]')];
const productPanels = [...document.querySelectorAll('[data-panel]')];
productChoices.forEach(choice => {
  choice.addEventListener('click', () => {
    const selected = choice.dataset.product;
    productChoices.forEach(button => {
      const active = button === choice;
      button.classList.toggle('is-active', active);
      button.setAttribute('aria-pressed', String(active));
    });
    productPanels.forEach(panel => {
      const active = panel.dataset.panel === selected;
      panel.hidden = !active;
      panel.classList.toggle('is-visible', active);
    });
  });
});

const workflow = [
  {
    title: 'A customer starts the conversation.',
    copy: 'A message arrives through a connected channel. The team can see it in the shared inbox when the relevant provider accounts and setup are in place.',
    label: 'INBOX EVENT', value: 'New product enquiry', icon: 'WA'
  },
  {
    title: 'The message gets the right customer context.',
    copy: 'Link the conversation to an existing customer or create a lead with its source, so the next teammate can see where the conversation began.',
    label: 'CUSTOMER RECORD', value: 'Linked profile · enquiry source', icon: 'CRM'
  },
  {
    title: 'Give the opportunity an owner.',
    copy: 'Assign the lead to a teammate and mark its temperature. A shared view makes the next follow-up easier to spot.',
    label: 'LEAD STATUS', value: 'Assigned owner · warm lead', icon: '↗'
  },
  {
    title: 'Create a reminder for the next step.',
    copy: 'Attach a follow-up task to the lead or customer record, with an owner and due date, so the conversation does not depend on memory.',
    label: 'FOLLOW-UP TASK', value: 'Share available options · tomorrow', icon: '✓'
  },
  {
    title: 'Prepare a quotation from the catalogue.',
    copy: 'Build a quote from products, variants and pricing details. The quotation stays connected to the customer and the opportunity.',
    label: 'SALES DOCUMENT', value: 'Quotation prepared for review', icon: 'Q'
  },
  {
    title: 'Turn the accepted quote into an order.',
    copy: 'Convert the quotation to a sales order. The concept reserves the required stock, helping the team avoid promising the same item twice.',
    label: 'ORDER & INVENTORY', value: 'Order confirmed · stock reserved', icon: 'SO'
  },
  {
    title: 'Create an invoice with a due date.',
    copy: 'Prepare the invoice from the order instead of re-entering every line item. A sequence number and payment status keep the record clear.',
    label: 'BILLING', value: 'Invoice drafted · due date set', icon: 'INV'
  },
  {
    title: 'Record payment and update the picture.',
    copy: 'Record a full or partial payment against the invoice. The customer balance, sales reports and business overview can then reflect the change.',
    label: 'PAYMENT RECORD', value: 'Payment recorded · balance updated', icon: '₹'
  }
];

const workflowButtons = [...document.querySelectorAll('[data-step]')];
const workflowTitle = document.querySelector('#workflow-card-title');
const workflowCopy = document.querySelector('#workflow-card-copy');
const workflowCount = document.querySelector('#workflow-count');
const workflowIcon = document.querySelector('#workflow-record-icon');
const workflowLabel = document.querySelector('#workflow-record-label');
const workflowValue = document.querySelector('#workflow-record-value');
const workflowProgress = document.querySelector('#workflow-progress-bar');

workflowButtons.forEach(button => {
  button.addEventListener('click', () => {
    const index = Number(button.dataset.step);
    const step = workflow[index];
    if (!step) return;
    workflowButtons.forEach(item => {
      const active = item === button;
      item.classList.toggle('is-active', active);
      item.setAttribute('aria-pressed', String(active));
    });
    workflowTitle.textContent = step.title;
    workflowCopy.textContent = step.copy;
    workflowCount.textContent = `STEP ${String(index + 1).padStart(2, '0')} OF 08`;
    workflowIcon.textContent = step.icon;
    workflowLabel.textContent = step.label;
    workflowValue.textContent = step.value;
    workflowProgress.style.width = `${((index + 1) / workflow.length) * 100}%`;
  });
});

const businessTabs = [...document.querySelectorAll('[data-business]')];
const businessPanels = [...document.querySelectorAll('[data-business-pane]')];
businessTabs.forEach(tab => {
  tab.addEventListener('click', () => {
    const selected = tab.dataset.business;
    businessTabs.forEach(button => {
      const active = button === tab;
      button.classList.toggle('is-active', active);
      button.setAttribute('aria-pressed', String(active));
    });
    businessPanels.forEach(panel => {
      const active = panel.dataset.businessPane === selected;
      panel.hidden = !active;
      panel.classList.toggle('is-visible', active);
    });
  });
});

const assistantReplies = [
  { match: /lead|follow.?up|call today/i, answer: 'This sample workspace has a lead follow-up view and task list. Review the assigned owner and latest activity before deciding who to contact.' },
  { match: /stock|shirt|size|colour|color|inventory/i, answer: 'The sample catalogue can be searched by product variant and stock location. Confirm the location and current stock record before promising availability.' },
  { match: /task|remind|tomorrow/i, answer: 'A follow-up task can be drafted with a due date and owner. In a live product, a teammate would review and confirm it before it is saved.' },
  { match: /invoice|payment|paid|overdue/i, answer: 'Invoice and payment status belong on the customer record. Check the due date and recorded payments before following up.' },
  { match: /customer|summary|deal|status/i, answer: 'A customer summary can bring together contacts, conversations, tasks, deals and billing history. The example here uses sample data only.' },
  { match: /navigate|page|inventory/i, answer: 'The product concept includes navigation across CRM, inventory, sales, messages and reports. A live workspace would take you to the relevant page.' }
];

const aiForm = document.querySelector('#ai-demo-form');
const aiInput = document.querySelector('#ai-question');
const aiAnswer = document.querySelector('#ai-answer');
const aiChatLine = document.querySelector('#ai-chat-line');
function showSampleReply(question) {
  const trimmed = question.trim();
  if (!trimmed) {
    aiInput.focus();
    return;
  }
  const item = assistantReplies.find(reply => reply.match.test(trimmed));
  const answer = item?.answer ?? 'The Lessbusy concept can help find records, prepare summaries and drafts, and surface business information. A connected product would answer from the user’s permitted business data; this preview does not access live records.';
  aiChatLine.textContent = `“${trimmed}”`;
  aiChatLine.hidden = false;
  aiAnswer.innerHTML = '<span class="answer-spark" aria-hidden="true">✳</span><p></p>';
  aiAnswer.querySelector('p').textContent = answer;
  aiInput.value = '';
}

aiForm?.addEventListener('submit', event => {
  event.preventDefault();
  showSampleReply(aiInput.value);
});
document.querySelectorAll('[data-prompt]').forEach(button => {
  button.addEventListener('click', () => showSampleReply(button.dataset.prompt));
});

document.querySelector('#current-year').textContent = String(new Date().getFullYear());
