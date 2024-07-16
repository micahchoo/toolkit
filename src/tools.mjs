import fs from 'fs';
import path from 'path';
import pkg from './paths.mjs'
const {getPaths, getSummary, processMarkdownFile} = pkg;

/* Example
createTool({
  name: 'Tool Name',
  description: 'A brief one-line description of the tool.',
  tags: ['category'],
  url: 'https://example.com',
  cost: 'Free',
});
*/
function debug(...args) {
    console.debug(...args);
}
function toolToCategories(tool) {
  let categories = getCategories();

  let template = fs.readFileSync('template/categories.md', 'utf-8');
  for (const category of categories) {
    const slug = category.slug.slice(-1)[0];
    // if the category slug is in the tool tags
    if (tool.tags.includes(slug)) {
      // replace the line [ ] (Tool Name)[link] with [x] (Tool Name)[link]
      template = template.replace(`[ ] [${category.title}]`, `[x] [${category.title}]`);
    }
  }
  return template;
}
function toolToJson(tool) {
  const json = JSON.stringify(tool, null, 2);
  const jsonTemplate = fs.readFileSync('template/json.md', 'utf-8');
  return jsonTemplate.replace(/```(json)?\n([\s\S]+)\n```/, '```json\n'+json+'\n```');
}

function toolToReadme(tool) {
  const template = fs.readFileSync('template/README.md', 'utf-8');
  let readme = template.replace("# Tool Name", `# ${tool.name}`);
  if (tool.description) {
    readme = readme.replace(/description: .*/g, `description: ${tool.description}`);
  }
  if (tool.url) {
    readme = readme.replace("https://example.com", tool.url);
  }
  return readme;
}
function toolToSummary(tool) {
  const template = fs.readFileSync('template/SUMMARY.md', 'utf-8');
  const title = tool.title || tool.name;
  return template.replace("Tool Name", `${title}`);
}
function publishTool(name) {
  const slug = slugify(name);

  // process README.md in the tool directory
  const filepath = path.join('gitbook', 'tools', slug);
  const filename = 'README.md';
  if (! fs.existsSync(filepath)) {
    console.log("Not found: ", filepath);
    throw new Error(["Can't publish", name, "-", filepath, "does not exist"].join(' '));
  }

  const tools = getTools();
  const tool = tools.find((x) => x.title === name || x.directory === filepath);

  if (!tool) {
    console.log("No tool found: ", name);
    throw new Error(["Can't publish", name, "- Tool not found"].join(' '));
  }

  const link = path.join('tools', slug, 'README.md');
  const summary = getSummary('gitbook');

  if (summary.match(link)) {
    console.log("Link already found in summary: ", link);
    throw new Error(["Can't publish", name, "-", link, "already published"].join(' '));
  }

  const newSummary = summary + `  * [${tool.title}](${link})\n`;
  fs.writeFileSync(path.join('gitbook', 'SUMMARY.md'), newSummary);

  const json = tool.json;
  delete json.draft;
  fs.writeFileSync(tool.jsonFilePath, toolToJson(json));
}
function slugify(toolName) {
  return name.replace(/\s/g, '-').replace(',','').toLowerCase();
}
function createTool(tool, opts={}) {
  const { name, tags } = tool;
  debug('Creating tool', name);
  const slug = slugify(name);
  const pathname = `gitbook/tools/${slug}`;
  const json = { draft: true, tags: [] };

  if (!opts.overwrite && fs.existsSync(pathname)) {
    debug("Tool already exists");
  } else {
    fs.mkdirSync(pathname, { recursive: true });
    fs.writeFileSync(`${pathname}/json.md`, toolToJson(json));
    fs.writeFileSync(`${pathname}/README.md`, toolToReadme(tool));
    fs.writeFileSync(`${pathname}/SUMMARY.md`, toolToSummary(tool));
    fs.writeFileSync(`${pathname}/categories.md`, toolToCategories(tool));
    debug("Tool created");
  }
  debug("");
  debug("*************************************");
  debug("**** Monorepo: Project directory ****")
  debug("*************************************");
  debug("");
  debug(pathname);
  debug("");
  debug("");
  debug("**********************************************");
  debug("**** Commit messages: Use custom template ****")
  debug("**********************************************");
  debug("                              ");
  debug(`GITBOOK-${slug}-{change_request_number}: {change_request_subject}`);
  debug("                              ");
  debug("                              ");
  return slug;
}

async function apiCall(url, params) {
  //debug('API call', url, params);
  const response = await fetch(url, {
    method: params.method,
    headers: {
      "Authorization": `Bearer ${process.env.GITBOOK_API_TOKEN}`,
      "Content-Type": "application/json",
      ...params.headers,
    },
    body: JSON.stringify(params.body),
    signal: AbortSignal.timeout( 10 * 1000 ), // 10 seconds
  });

  //debug('API response', response.status);
  // check rate limit headers
  if (response.headers.get('x-ratelimit-remaining') === '0') {
    console.log('Rate limit exceeded');
  }
  const contentType = response.headers.get("content-type");
  if (contentType && contentType.indexOf("application/json") !== -1) {
    const data = await response.json();
    if (data.error) {
      throw new Error(`${data.error.message} (${data.error.code})`);
    }
    return data;
  } else {
    return response;
  }
}

async function fetchSpaces(page='') {
  const data = await apiCall('https://api.gitbook.com/v1/collections/jQKvylm6WgaH5IFrlIMh/spaces?' + new URLSearchParams({ page: page }), {
    method: 'GET',
  });
  console.log(data.items.map((item) => `${item.id} ${item.title}`));
  if (data.next) {
    console.log('next', data.next);
    if (data.next.page === data.items[0].id) {
      console.log("next page is same as current page!");
      // hack! gitbook api bug: the last item is the same as the first time. take the id of the second to last item as the next page
      return data.items.concat(await fetchSpaces(data.items[data.items.length-2].id));
    }
    if (data.next.page) {
      return data.items.concat(await fetchSpaces(data.next.page));
    }
  }
  return data.items;
}

async function fetchTeams(page='') {
  const data = await apiCall('https://api.gitbook.com/v1/orgs/WQpOq5ZFue4N6m65QCJq/teams?' + new URLSearchParams({ page: page }), {
    method: 'GET',
  });
  if (data.next && data.next.page) {
    return data.items.concat(await fetchTeams(data.next.page));
  }
  return data.items;
}

async function createToolOnGitbook(toolName, email) {
  debug('Creating tool on Gitbook', toolName);
  const space = await createSpace(toolName);
  const team = await createTeam(toolName);

  if (email) {
    await addTeamMember(team, email);
    await addTeamMember({id : "6RIWbZ6uKR8m6kwje0s7"}, email); // Tool Page Maintainers team
    debug("Added 1 team member");
  }

  if (space.urls) {
    return space.urls.app;
  } else {
    debug('Error: No URL found');
    debug(space);
  }
}

async function findSpace(name, page='') {
  debug("searching for existing space", page);
  const spaces = readSpaces();
  const space = spaces.find((space) => space.title === name);
  if (space) {
    return space;
  }
}

async function createSpace(name) {
  const space = await findSpace(name);
  if (space) {
    debug('Space already exists');
    return space;
  }

  debug('Creating a new empty space', name);
  const data = await apiCall('https://api.gitbook.com/v1/orgs/WQpOq5ZFue4N6m65QCJq/spaces', {
    method: 'POST',
    body: {
      title: name,
      emoji: '🛠️',
      parent: 'jQKvylm6WgaH5IFrlIMh'
    },
  });

  // update spaces.json
  const spaces = readSpaces();
  spaces.push(data);
  writeSpaces(spaces);

  return data;
}

function readSpaces() {
  return JSON.parse(fs.readFileSync('spaces.json', 'utf-8'));
}
function writeSpaces(spaces) {
  // remove duplicate spaces by id
  spaces = spaces.filter((space, index, self) => self.findIndex((s) => s.id === space.id) === index);
  console.log('writing', spaces.length, 'spaces to',  'spaces.json');
  fs.writeFileSync('spaces.json', JSON.stringify(spaces, null, 2));
}
function readTeams() {
  return JSON.parse(fs.readFileSync('teams.json', 'utf-8'));
}
function writeTeams(teams) {
  console.log('writing', teams.length, 'teams to',  'teams.json');
  fs.writeFileSync('teams.json', JSON.stringify(teams, null, 2));
}

async function renameSpace(space, name) {
  debug('Renaming space to', name);
  const data = await apiCall(`https://api.gitbook.com/v1/spaces/${space.id}`, {
    method: 'PATCH',
    body: { "title": name },
  });
  return data;
}

async function findTeam(name, page='') {
  const teams = readTeams();
  const team = teams.find((team) => team.title === name);
  if (team) {
    return team;
  }
}

async function addTeamMember(team, email) {
  const response = await apiCall(`https://api.gitbook.com/v1/orgs/WQpOq5ZFue4N6m65QCJq/teams/${team.id}/members`, {
    method: 'PUT',
    body: { "add": [email] }
  });
  if (response.status !== 204) {
    throw new Error(`Failed to add team member to ${team}`);
  }
}

async function _createTeam(name) {
  try {
    const data = await apiCall('https://api.gitbook.com/v1/orgs/WQpOq5ZFue4N6m65QCJq/teams', {
      method: 'PUT',
      body: { "title": name },
    });
    return data;
  } catch (e) {
    if (e.message === "This name is already taken by another team in your organization. (400)") {
      console.log("Edge case: the team exists on gitbook but we don't know about it.");
      const teams = await fetchTeams();
      return teams.find((element) => element.title === name);
    }
    throw e;
  }
}

async function createTeam(name) {
  const team = await findTeam(name);
  if (team) {
    debug('Team already exists');
    return team;
  }
  debug('Creating team', name);
  const data = await _createTeam(name);

  // update teams.json
  const teams = readTeams();
  teams.push(data);
  writeTeams(teams);

  return data;
}
function removeTool(toolName) {
  // Remove the tool directory
  if (fs.existsSync(`gitbook/tools/${toolName}`)) {
    fs.rmSync(`gitbook/tools/${toolName}`, { recursive: true });
  } else {
    throw new Error(`Tool ${toolName} not found`);
  }

  // Read the SUMMARY.md file and remove the markdown link to this tool
  const summary = fs.readFileSync('gitbook/SUMMARY.md', 'utf-8');
  const newSummary = summary.replace(new RegExp(`  \\* \\[.*\\]\\(tools/${toolName}\\/README.md\\)\n`), '');
  fs.writeFileSync('gitbook/SUMMARY.md', newSummary);
}

function markdownToJson(filepath) {
  if (fs.existsSync(filepath)) {
    const markdown = fs.readFileSync(filepath, 'utf-8');
    const matches = markdown.match(/```(json)?\n([\s\S]+)\n```/);
    if (matches) {
      try {
        return JSON.parse(matches[2]);
      } catch (e) {
        console.error(`Error parsing JSON in ${filepath}`);
        throw e;
      }
    }
  }
  return {};
}
function markdownToCategories(filepath) {
  if (fs.existsSync(filepath)) {
    const markdown = fs.readFileSync(filepath, 'utf-8');
    // Match lines with a checked box
    const selected = markdown.match(/\[x\] \[.*\]\(.*\)/g);
    if (selected) {
      // extract the tag from the markdown link
      return selected.map((line) => line.match(/\[x\] \[.*\]\(.*\/([a-z-]*)\)/)[1] );
    }
  }
  return [];
}


function getTools() {
  const pathname = 'gitbook/tools';
  return fs.readdirSync(pathname).flatMap((filename) => {
    if (filename[0] === ".") { return null; } // ignore hidden files

    // process README.md in each tool directory
    const filepath = path.join(pathname, filename, 'README.md');
    if (fs.existsSync(filepath)) {
      const markdownFile = processMarkdownFile(filepath, filename, []);
      const content = markdownFile.content;
      const toolDir = markdownFile.directory;

      // try to get the cost from the content
      const cost = (content.match(/\[x\] Partially Free/) && 'Partially Free') || (content.match(/\[x\] Free/) && 'Free') || (content.match(/\[x\] Paid/) && 'Paid') || null;

      // try to get the URL from the content
      // it may be a markdown link
      const urlmarkdown = content.match(/## URL\n\n(.*)\n\n/);
      if (urlmarkdown === null) {
        console.log("No url markdown matched for", filepath);
        throw new Error("README format Error");
      }
      const markdownLink = urlmarkdown[1].match(/\[(.*)\]\((.*)\)/);
      const url = markdownLink ? markdownLink[2] : urlmarkdown[1];

      // get JSON data from JSON.md if it exists
      const jsonFilePath = path.join(toolDir, 'json.md');
      const json = markdownToJson(jsonFilePath);

      // get category data from categories.md if it exists
      const categoriesFilePath = path.join(toolDir, 'categories.md');
      const categories = markdownToCategories(categoriesFilePath);

      if (json.url && url !== json.url) {
        console.warn(`URL in README.md overrided in JSON.md for ${filename}`);
        console.warn(url, '=>', json.url);
      }

      // merge json.tags and categories and dedupe
      let tags = [...new Set([...json.tags, ...categories])];

      return {
        ...markdownFile,
        cost,
        url,
        ...json,  // JSON data overrides
        tags,
        categoriesFilePath,
        categories,
        jsonFilePath,
        json, // the original json structure
      };
    }

    throw new Error(`No README.md found in ${filename}`);

  });
}

function updateToolJSON(tool, json) {
  if (!json) {
    json = tool.json;
  }
  const pathname = tool.jsonFilePath;

  console.log('Updating', pathname);
  fs.writeFileSync(pathname, toolToJson(json));
  tool.json = json;
}

function updateToolCategories(tool) {
  const pathname = tool.categoriesFilePath;

  console.log('Updating', pathname);
  fs.writeFileSync(pathname, toolToCategories(tool));
}

function updateToolSummary(tool) {
  const pathname = path.join(tool.directory, 'SUMMARY.md');
  console.log('Updating', pathname);
  fs.writeFileSync(pathname, toolToSummary(tool));
}

function getCategories() {
  return getPaths('gitbook/categories').filter((category) => {
    const tag = category.slug.slice(-1)[0];
    return category.filename !== 'README.md';
  });
}

export default {
  createTool,
  createToolOnGitbook,
  fetchTeams,
  fetchSpaces,
  getTools,
  getCategories,
  publishTool,
  removeTool,
  updateToolJSON,
  updateToolCategories,
  updateToolSummary,
  writeSpaces,
  writeTeams,
};
