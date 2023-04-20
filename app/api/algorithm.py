# -*- coding: utf-8 -*-
import numpy as np
import networkx as nx
from networkx.algorithms.community import kernighan_lin_bisection
from networkx.algorithms import community
from torch_geometric.data import Data
import scipy
import torch

class Algorithm:
    def __init__(self, net):
        # net中包含t条数据，每条数据包含四个变量分别为发送点、接收点、持续时间、属性
        if net[0].__len__() <= 2:
            return 'error ,the data structure is not right'
        else:
            node = []
            for i in net:
                if i[0] not in node:
                    node.append(i[0])
                if i[1] not in node:
                    node.append(i[1])
            A = np.zeros([node.__len__(), node.__len__()])
            for i in net:
                A[node.index(i[0]), node.index(i[1])] = 1
                A[node.index(i[1]), node.index(i[0])] = 1
            self.A = A
            # 邻接矩阵
            self.node = node
            self.G = nx.Graph()
            for i in net:
                self.G.add_edge(i[0], i[1])
            # 节点列表
            # 图格式数据

            # Pyg格式图数据
            adj = nx.adjacency_matrix(self.G).todense()
            adj = scipy.sparse.coo_matrix(adj)
            edge_list = torch.LongTensor([adj.row, adj.col])
            x = torch.eye(adj.shape[0])
            self.pyg = Data(edge_index=edge_list, x=x)

    def getDensity(self, graph):
        return (graph.nonzero()[0].__len__()) / (graph.__len__())

    # 中心性指标
    def getDegreeCentrality(self):
        return nx.degree_centrality(self.G)

    def getClosenessCentrality(self):
        return nx.closeness_centrality(self.G)

    def getBetweennessCentrality(self):
        return nx.betweenness_centrality(self.G)

    def getEBetweennessCentrality(self):
        return nx.edge_betweenness_centrality(self.G)

    def getCurrentFlowClosenessCentrality(self):
        G1 = nx.Graph(self.A)
        res = nx.current_flow_closeness_centrality(G1)
        result = {}
        for i in range(0, self.node.__len__()):
            result.update({self.node[i]: res[i]})
        return result

    def getCurrentFlowBetweennessCentrality(self):
        G1 = nx.Graph(self.A)
        res = nx.current_flow_betweenness_centrality(G1)
        result = {}
        for i in range(0, self.node.__len__()):
            result.update({self.node[i]: res[i]})
        return result

    def getEigenvectorCentrality(self):
        return nx.eigenvector_centrality(self.G)

    def getEigenvectorCentralityNumpy(self):
        return nx.eigenvector_centrality_numpy(self.G)

    def getLoadCentrality(self):
        return nx.load_centrality(self.G)

    # 下面四个是链接预测
    def takeThird(self, elem):
        return elem[2]

    def resourceAllocationIndex(self):
        iter = nx.resource_allocation_index(self.G)
        data = []
        for a, b, c in iter:
            data.append([a, b, c])
        data.sort(key=self.takeThird, reverse=True)
        return data

    def jaccardCoefficient(self):
        iter = nx.jaccard_coefficient(self.G)
        data = []
        for a, b, c in iter:
            data.append([a, b, c])
        data.sort(key=self.takeThird, reverse=True)
        return data

    def adamicAdarIndex(self):
        iter = nx.adamic_adar_index(self.G)
        data = []
        for a, b, c in iter:
            data.append([a, b, c])
        data.sort(key=self.takeThird, reverse=True)
        return data

    def preferentialAttachment(self):
        iter = nx.preferential_attachment(self.G)
        data = []
        for a, b, c in iter:
            data.append([a, b, c])
        data.sort(key=self.takeThird, reverse=True)
        return data

    # 社团划分
    def asynFluidc(self, k=2):
        iter = community.asyn_fluidc(self.G, k)
        communities = []
        for a in iter:
            b = list(a)
            communities.append(b)
        return communities

    def asynLpaCommunities(self):
        iter = community.asyn_lpa_communities(self.G)
        communities = []
        for a in iter:
            b = list(a)
            communities.append(b)
        return communities

    def labelPropagation(self):
        iter = community.label_propagation_communities(self.G)
        communities = []
        for a in iter:
            b = list(a)
            communities.append(b)
        return communities
