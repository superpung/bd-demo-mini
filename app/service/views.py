# -*- coding:utf-8 -*-

from flask import render_template
from . import service

@service.route('/')
def service():
    return render_template('/main.html')
