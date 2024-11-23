import dva from 'dva';
import { Component } from 'react';
import createLoading from 'dva-loading';
import history from '@tmp/history';

let app = null;

export function _onCreate() {
  const plugins = require('umi/_runtimePlugin');
  const runtimeDva = plugins.mergeConfig('dva');
  app = dva({
    history,
    
    ...(runtimeDva.config || {}),
    ...(window.g_useSSR ? { initialState: window.g_initialData } : {}),
  });
  
  app.use(createLoading());
  (runtimeDva.plugins || []).forEach(plugin => {
    app.use(plugin);
  });
  
  app.model({ namespace: 'approval', ...(require('D:/React/Reactwork/blog-node-masterhou/blog-master/src/models/approval.ts').default) });
app.model({ namespace: 'article', ...(require('D:/React/Reactwork/blog-node-masterhou/blog-master/src/models/article.ts').default) });
app.model({ namespace: 'category', ...(require('D:/React/Reactwork/blog-node-masterhou/blog-master/src/models/category.ts').default) });
app.model({ namespace: 'feedback', ...(require('D:/React/Reactwork/blog-node-masterhou/blog-master/src/models/feedback.ts').default) });
app.model({ namespace: 'global', ...(require('D:/React/Reactwork/blog-node-masterhou/blog-master/src/models/global.ts').default) });
app.model({ namespace: 'mc', ...(require('D:/React/Reactwork/blog-node-masterhou/blog-master/src/models/mc.ts').default) });
app.model({ namespace: 'messageSender', ...(require('D:/React/Reactwork/blog-node-masterhou/blog-master/src/models/messageSender.ts').default) });
app.model({ namespace: 'team', ...(require('D:/React/Reactwork/blog-node-masterhou/blog-master/src/models/team.ts').default) });
app.model({ namespace: 'user', ...(require('D:/React/Reactwork/blog-node-masterhou/blog-master/src/models/user.ts').default) });
  return app;
}

export function getApp() {
  return app;
}

export class _DvaContainer extends Component {
  render() {
    const app = getApp();
    app.router(() => this.props.children);
    return app.start()();
  }
}
