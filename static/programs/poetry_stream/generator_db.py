import sqlite3
import random
import inspect, os, shutil
from collections import deque

def recreate_words(curs):
    comm = "SELECT * FROM word;"
    dat = curs.execute(comm)

    rev_dic = {}
    for i, w in dat:
        rev_dic[i] = w

    return rev_dic

def next_word(curs, seq, last_pid, dic):
    comm = ("SELECT Word4, Poem FROM sequence WHERE Word1 = '%s' "
    "AND Word2 = '%s' AND Word3 = '%s' AND Poem != %d" % (seq[0], seq[1], seq[2], last_pid))
    res = curs.execute(comm)
    dat = res.fetchall()

    if len(dat):
        return dat[random.randint(0, len(dat)-1)]

    comm = ("SELECT Word4, Poem FROM sequence WHERE Word2 = '%s' "
    "AND Word3 = '%s' AND Poem != %d" % (seq[1], seq[2], last_pid))
    res = curs.execute(comm)
    dat = res.fetchall()

    if len(dat):
        return dat[random.randint(0, len(dat)-1)]

    comm = ("SELECT Word4, Poem FROM sequence WHERE Word3 = '%s' AND Poem != %d" % (seq[2], last_pid))
    res = curs.execute(comm)
    dat = res.fetchall()

    if len(dat):
        return dat[random.randint(0, len(dat)-1)]

    return (random.randint(0, len(dic.keys())) - 1, -1) # What to do when there is no next word?

if __name__ == "__main__":
    path = os.path.dirname(inspect.getfile(inspect.currentframe()))
    conn = sqlite3.connect(os.path.join(path, 'quaddict.db'))
    curs = conn.cursor()

    for i in range(12):
        pid = -1
        dic = recreate_words(curs)
        words = [-1, -1, random.randint(0, len(dic))]
        seq = deque(words)
        stream_path = os.path.join(path, 'stream')
        fil = open(stream_path, 'w')

        for j in range(2000):
            nex, pid = next_word(curs, seq, pid, dic)
            fil.write(dic[nex] + " ")

            seq.append(nex)
            seq.popleft()
        fil.close()
        shutil.move(stream_path, stream_path + str(i))
