# coding=utf-8
import json
import numpy as np
import pandas as pd
from flask import jsonify
from flask import request
from flask_socketio import emit
from app import app
from . import api
import os
from .algorithm import Algorithm
import networkx as nx

@api.route('/', methods=['POST'])
def api_num_changed():
    listData = request.get_json()
    graph = Algorithm(listData['data'])
    func = listData['api']
    if func == 1:
        tmp = graph.num_changed(listData['para'])
        return jsonify(tmp)
    # 下面九个网络中心性指标
    elif func == 2:
        tmp = graph.getDegreeCentrality()
        return jsonify(tmp)
    elif func == 3:
        tmp = graph.getClosenessCentrality()
        return jsonify(tmp)
    elif func == 4:
        tmp = graph.getBetweennessCentrality()
        return jsonify(tmp)
    elif func == 5:
        tmp = graph.getEBetweennessCentrality()
        ntmp = []
        for i in tmp:
            ntmp.append([i[0], i[1], tmp[i]])
        return jsonify(ntmp)
    elif func == 6:
        tmp = graph.getCurrentFlowClosenessCentrality()
        return jsonify(tmp)
    elif func == 7:
        tmp = graph.getCurrentFlowBetweennessCentrality()
        return jsonify(tmp)
    elif func == 8:
        tmp = graph.getEigenvectorCentrality()
        return jsonify(tmp)
    elif func == 9:
        tmp = graph.getEigenvectorCentralityNumpy()
        return jsonify(tmp)
    elif func == 10:
        tmp = graph.getLoadCentrality()
        return jsonify(tmp)
    # 下面四个链接预测
    elif func == 11:
        tmp = graph.resourceAllocationIndex()
        return jsonify(tmp)
    elif func == 12:
        tmp = graph.jaccardCoefficient()
        return jsonify(tmp)
    elif func == 13:
        tmp = graph.adamicAdarIndex()
        return jsonify(tmp)
    elif func == 14:
        tmp = graph.preferentialAttachment()
        return jsonify(tmp)
    # 下面三个社团检测
    elif func == 15:
        tmp = graph.asynFluidc(listData['para'])
        return jsonify(tmp)
    elif func == 16:
        tmp = graph.asynLpaCommunities()
        return jsonify(tmp)
    elif func == 17:
        tmp = graph.labelPropagation()
        return jsonify(tmp)

@api.route('/data', methods=['POST'])
def upload_data():
    f = request.files['file']
    file_dir = os.path.join(app.config['UPLOAD_FOLDER'], f.filename)
    f.save(file_dir)
    if request.form.get('data_type') == 'network':
        df = pd.read_csv(file_dir, sep=' ',dtype=str)
        graph = nx.from_edgelist(df.values)
        graph = nx.to_undirected(graph)
        edges = nx.edges(graph)
        nodes = nx.nodes(graph)
        node2idx = {}
        for i, node in enumerate(set(nodes)):
            node2idx[node] = i
        data = {
            'nodes': [],
            'edges': [],
            'label': [],
            'edges_idx': [],
            'classes': None
        }
        for node in nodes:
            data['nodes'].append({
                'name': node,
                'idx': node2idx[node]
            })
        for edge in edges:
            data['edges'].append({
                'source': edge[0],
                'target': edge[1]
            })
            data['edges_idx'].append({
                'source': node2idx[edge[0]],
                'target': node2idx[edge[1]]
            })
        return jsonify(data)
    elif request.form.get('data_type') == 'text':
        with open(file_dir) as f:
            data = {
                'data': f.read()
            }
            return jsonify(data)
